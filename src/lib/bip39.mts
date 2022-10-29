import { base as basex } from './base-x/index.js';
import * as ethUtil from './ethUtil.mjs';

import { pbkdf2, randomBytes, sha } from './crypto.mjs';
import {
  COIN_SYMBOL,
  getNetWorkInfo,
  networkIsEthereum,
  networkIsRsk,
} from './networks.mjs';
import { assert, binaryToByte, bytesToBinary } from './utils.mjs';
import english from './wordlists/english.json' assert { type: 'json' };
import BIP32Factory from './bip32/index.js';
import * as ecc from './tiny-secp256k1/index.js';
import { Buffer } from './buffer/index.js';
import * as bitcoin from './bitcoinjs-lib/index.js';
import { ECPairFactory } from './ecpair/index.js';

const bip32 = BIP32Factory(ecc);
const ecpair = ECPairFactory(ecc);

// declare const libs: typeof import("../assets/bip39-libs.js");
// const libsLoader = async () => libs;

function assertEntropy(entropy: Uint8Array) {
  assert(
    entropy instanceof Uint8Array &&
      [16, 20, 24, 28, 32].includes(entropy.length),
    'Invalid entropy'
  );
}

async function deriveChecksumBits(entropy: Uint8Array) {
  const ENT = entropy.length * 8;
  const CS = ENT / 32;
  const hash = await sha('SHA-256', entropy);
  return bytesToBinary(hash).slice(0, CS);
}

/**
 * Converts raw entropy in form of byte array to mnemonic string.
 * @param entropy byte array
 * @param wordlist imported wordlist for specific language
 * @returns 12-24 words
 * @example
 * const ent = new Uint8Array([
 *   0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f,
 *   0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f
 * ]);
 * await entropyToMnemonic(ent, wordlist);
 * // 'legal winner thank year wave sausage worth useful legal winner thank yellow'
 */
export async function entropyToMnemonic(
  entropy: Uint8Array,
  wordlist: string[]
): Promise<string> {
  assertEntropy(entropy);
  const entropyBits = bytesToBinary(entropy);
  const checksumBits = await deriveChecksumBits(entropy);
  const bits = entropyBits + checksumBits;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const chunks = bits.match(/(.{1,11})/g)!;
  const words = chunks.map((binary) => {
    const index = binaryToByte(binary);
    return wordlist[index];
  });
  return words.join(' ');
}

/**
 * Generate mnemonic. Uses Cryptographically-Secure Random Number Generator.
 * @param wordlist imported wordlist for specific language
 * @param strength mnemonic strength 128-256 bits
 * @example
 * generateMnemonic(wordlist, 128)
 * // 'bunker expand insane mean adapt throw focus business network among cruel tomato'
 */
export async function generateMnemonic(
  wordlist: string[],
  strength = 128
): Promise<string> {
  assert(
    Number.isSafeInteger(strength) &&
      strength > 0 &&
      strength <= 256 &&
      strength % 32 === 0,
    'Invalid strength'
  );
  return entropyToMnemonic(randomBytes(strength / 8), wordlist);
}

const hasStrongRandom = () => {
  return 'crypto' in self && self['crypto'] !== null;
};
export const bytesToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, (byte) => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

export const getLanguageWordLists = (defaultLanguage: 'english') => {
  if (defaultLanguage !== 'english') {
    throw new Error(`unsupport language: ${defaultLanguage}`);
  }
  /** 因为现在只提供英文 */
  return english;
};
/** 生成助记词 */
export const generateRandomMnemonic = async (length = 12) => {
  if (hasStrongRandom() === false) {
    throw new Error('This browser does not support strong randomness');
  }
  const numWords = length;
  const strength = (numWords / 3) * 32;
  const buffer = new Uint8Array(strength / 8);
  const byteArray = crypto.getRandomValues(buffer);
  if (byteArray.length % 4 > 0) {
    throw (
      'Data length in bits should be divisible by 32, but it is not (' +
      byteArray.length +
      ' bytes = ' +
      byteArray.length * 8 +
      ' bits).'
    );
  }
  const wordList = getLanguageWordLists('english');
  const mnemonic = await generateMnemonic(wordList, strength);
  const seedBuff = await mnemonicToSeed(mnemonic);
  return {
    mnemonic,
    seedBuff,
  };
};
function nfkd(str: string) {
  if (typeof str !== 'string')
    throw new TypeError(`Invalid mnemonic type: ${typeof str}`);
  return str.normalize('NFKD');
}
function normalize(str: string) {
  const norm = nfkd(str);
  const words = norm.split(' ');
  if (false === [12, 15, 18, 21, 24].includes(words.length))
    throw new Error('Invalid mnemonic');
  return { nfkd: norm, words };
}
const salt = (passphrase: string) => nfkd(`mnemonic${passphrase}`);
export async function mnemonicToSeed(mnemonic: string, passphrase = '') {
  return pbkdf2(
    'SHA-512',
    normalize(mnemonic).nfkd,
    salt(passphrase),
    2048,
    64
  );
}

const validateMnemonic = async (mnemonic: string, wordlist: string[]) => {
  try {
    await mnemonicToEntropy(mnemonic, wordlist);
  } catch (e) {
    return false;
  }
  return true;
};

async function mnemonicToEntropy(
  mnemonic: string,
  wordlist: string[]
): Promise<Uint8Array> {
  const { words } = normalize(mnemonic);
  assert(words.length % 3 === 0, 'Invalid mnemonic');
  // convert word indices to 11 bit binary strings
  const bits = words
    .map((word) => {
      const index = wordlist.indexOf(word);
      assert(index !== -1, 'Invalid mnemonic');
      return index.toString(2).padStart(11, '0');
    })
    .join('');
  // split the binary string into ENT/CS
  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);
  // calculate the checksum and compare
  const entropy = new Uint8Array(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    entropyBits.match(/(.{1,8})/g)!.map(binaryToByte)
  );
  assertEntropy(entropy);
  const newChecksum = await deriveChecksumBits(entropy);
  assert(newChecksum === checksumBits, 'Invalid checksum');

  return entropy;
}

// #region 校验助记词
/** 规范化 */
export const normalizeString = (str: string) => {
  return str.normalize('NFKD');
};

/** 助记词转数组 */
export const splitWords = (phrase: string) => {
  return phrase.split(/\s/g).filter(function (x) {
    return x.length;
  });
};

/** 查找助记词错误 */
export const findPhraseErrors = async (phrase: string) => {
  phrase = normalizeString(phrase);
  const words = splitWords(phrase);
  if (words.length == 0) {
    throw new Error('phrase length is 0');
  }
  // Check word
  /** @TODO 目前只支持英文格式 */
  const wordList = getLanguageWordLists('english');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (wordList.indexOf(word) == -1) {
      // 找到不存在助记词列表的
      throw new Error(word + ' not in wordlist');
    }
  }
  // Check the words are valid
  const isValid = await validateMnemonic(phrase, wordList);
  if (false === isValid) {
    throw new Error('Invalid mnemonic');
  }
};

// #endregion

// #region 助机词生成地址
async function convertRippleAdrr(address: string) {
  return basex(
    'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'
  ).encode(
    basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz').decode(
      address
    )
  );
}

async function convertRipplePriv(priv: string) {
  return basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')
    .decode(priv)
    .toString('hex')
    .slice(2, 66);
}

function calcBip32ExtendedKey(
  // bip32RootKey: import('../assets/bip39-libs.js').HDNode,
  bip32RootKey: import('./bip32/index.js').BIP32Interface,
  path: DERIVATION_PATH
) {
  const pathBits = path.split('/');
  for (let i = 0; i < pathBits.length; i++) {
    const bit = pathBits[i];
    const index = parseInt(bit);
    if (isNaN(index)) {
      continue;
    }
    const hardened = bit[bit.length - 1] == "'";
    const isPriv = !bip32RootKey.isNeutered();
    const invalidDerivationPath = hardened && !isPriv;
    if (invalidDerivationPath) {
      return null;
    } else if (hardened) {
      bip32RootKey = bip32RootKey.deriveHardened(index);
    } else {
      bip32RootKey = bip32RootKey.derive(index);
    }
  }
  return bip32RootKey;
}

async function toChecksumAddressForRsk(
  address: string,
  chainId: number | null = null
) {
  if (typeof address !== 'string') {
    throw new Error('address parameter should be a string.');
  }

  if (false === /^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error('Given address is not a valid RSK address: ' + address);
  }

  const stripAddress = (await stripHexPrefix(address)).toLowerCase();
  const prefix = chainId != null ? chainId.toString() + '0x' : '';
  const keccakHash = (
    await ethUtil.keccakHex(prefix + stripAddress, 256)
  ).replace(/^0x/i, '');
  let checksumAddress = '0x';

  for (let i = 0; i < stripAddress.length; i++) {
    checksumAddress +=
      parseInt(keccakHash[i], 16) >= 8
        ? stripAddress[i].toUpperCase()
        : stripAddress[i];
  }

  return checksumAddress;
}

// RSK - RSK functions - begin
async function stripHexPrefix(address: string) {
  if (typeof address !== 'string') {
    throw new Error('address parameter should be a string.');
  }

  const hasPrefix =
    address.substring(0, 2) === '0x' || address.substring(0, 2) === '0X';

  return hasPrefix ? address.slice(2) : address;
}

export async function calcForDerivationPath(
  symbol: COIN_SYMBOL,
  seed: string,
  derivationPath: DERIVATION_PATH,
  index = 0
) {
  // const libs = await libsLoader();
  const networkInfo = getNetWorkInfo(symbol);

  const bip32RootKey = bip32.fromSeed(
    Buffer.from(seed, 'hex'),
    networkInfo.network
  );
  const bip32ExtendedKey = calcBip32ExtendedKey(bip32RootKey, derivationPath);
  if (undefined == bip32ExtendedKey) {
    throw new Error(
      `derivationPath: ${derivationPath} not find bip32ExtendedKey.`
    );
  }

  const key = bip32ExtendedKey.derive(index);
  // bitcoin.address.

  // let keyPair = key.keyPair;
  let address = key.toBase58(); // keyPair.getAddress().toString();
  const hasPrivkey = !key.isNeutered();
  let privkey = 'NA';
  if (hasPrivkey) {
    privkey = key.toWIF();
  }
  let pubkey = key.publicKey.toString('hex');
  // Ethereum values are different
  if (networkIsEthereum(symbol)) {
    const pubkeyBuffer = key.publicKey;

    const ethPubkey = await ethUtil.importPublic(pubkeyBuffer);
    const addressBuffer = await ethUtil.publicToAddress(ethPubkey);
    const hexAddress = ethUtil.addHexPrefix(addressBuffer.toString('hex'));
    const checksumAddress = await ethUtil.toChecksumAddress(hexAddress);
    address = ethUtil.addHexPrefix(checksumAddress);
    pubkey = ethUtil.addHexPrefix(pubkey);
    if (hasPrivkey) {
      privkey = ethUtil.bufferToHex(key.privateKey!);
    }
  }
  // TRX is different
  if (networkInfo.name == 'TRX - Tron') {
    const keyPair = ecpair.fromPrivateKey(key.privateKey!, {
      network: bitcoin.networks.bitcoin,
      compressed: false,
    });

    // keyPair = new libs.bitcoin.ECPair(keyPair.d, null, {
    //   network: networkInfo.network,
    //   compressed: false,
    // });
    const pubkeyBuffer = keyPair.getPublicKey!();
    const ethPubkey = await ethUtil.importPublic(pubkeyBuffer);
    const addressBuffer = await ethUtil.publicToAddress(ethPubkey);
    address = bitcoin.address.toBase58Check(addressBuffer, 0x41);
    if (hasPrivkey) {
      privkey = keyPair.privateKey!.toString('hex');
    }
  }

  // // RSK values are different
  // if (networkIsRsk(symbol)) {
  //   const pubkeyBuffer = keyPair.getPublicKeyBuffer();
  //   const ethPubkey = await ethUtil.importPublic(pubkeyBuffer);
  //   const addressBuffer = await ethUtil.publicToAddress(ethPubkey);
  //   const hexAddress = addressBuffer.toString("hex");
  //   // Use chainId based on selected network
  //   // Ref: https://developers.rsk.co/rsk/architecture/account-based/#chainid
  //   let chainId;
  //   const rskNetworkName = networkInfo.name;
  //   switch (rskNetworkName) {
  //     case "R-BTC - RSK":
  //       chainId = 30;
  //       break;
  //     case "tR-BTC - RSK Testnet":
  //       chainId = 31;
  //       break;
  //     default:
  //       chainId = null;
  //   }
  //   const checksumAddress = await toChecksumAddressForRsk(hexAddress, chainId);
  //   address = ethUtil.addHexPrefix(checksumAddress);
  //   pubkey = ethUtil.addHexPrefix(pubkey);
  //   if (hasPrivkey) {
  //     privkey = ethUtil.bufferToHex(keyPair.d.toBuffer());
  //   }
  // }

  // // Handshake values are different
  // if (networkInfo.name == "HNS - Handshake") {
  //   const ring = libs.handshake.KeyRing.fromPublic(
  //     keyPair.getPublicKeyBuffer()
  //   );
  //   address = ring.getAddress().toString();
  // }

  // // Stellar is different
  // if (networkInfo.name == "XLM - Stellar") {
  //   const keypair = libs.stellarUtil.getKeypair(derivationPath, seed);
  //   privkey = keypair.secret();
  //   pubkey = address = keypair.publicKey();
  // }

  // if (networkInfo.name == "NAS - Nebulas") {
  //   const privKeyBuffer = keyPair.d.toBuffer(32);
  //   const nebulasAccount = libs.nebulas.Account.NewAccount();
  //   nebulasAccount.setPrivateKey(privKeyBuffer);
  //   address = nebulasAccount.getAddressString();
  //   privkey = nebulasAccount.getPrivateKeyString();
  //   pubkey = nebulasAccount.getPublicKeyString();
  // }
  // // Ripple values are different
  // if (networkInfo.name == "XRP - Ripple") {
  //   privkey = await convertRipplePriv(privkey);
  //   address = await convertRippleAdrr(address);
  // }

  // // Bitcoin Cash address format may vary
  // if (networkInfo.name == "BCH - Bitcoin Cash") {
  //   const bchAddrType = "need input bitcoinCashAddressType" as string;
  //   if (bchAddrType == "cashaddr") {
  //     address = libs.bchaddr.toCashAddress(address);
  //   } else if (bchAddrType == "bitpay") {
  //     address = libs.bchaddr.toBitpayAddress(address);
  //   }
  // }
  // // Bitcoin Cash address format may vary
  // if (networkInfo.name == "SLP - Simple Ledger Protocol") {
  //   const bchAddrType = "need input bitcoinCashAddressType" as string;
  //   if (bchAddrType == "cashaddr") {
  //     address = libs.bchaddrSlp.toSlpAddress(address);
  //   }
  // }

  // // ZooBC address format may vary
  // if (networkInfo.name == "ZBC - ZooBlockchain") {
  //   const result = libs.zoobcUtil.getKeypair(derivationPath, seed);
  //   const publicKey = result.pubKey.slice(1, 33);
  //   const privateKey = result.key;
  //   privkey = privateKey.toString("hex");
  //   pubkey = publicKey.toString("hex");
  //   address = libs.zoobcUtil.getZBCAddress(publicKey, "ZBC");
  // }
  return {
    privkey,
    pubkey,
    address,
  };
}
// #endregion

/** 助记词生成地址对应派生路径 */
export enum DERIVATION_PATH {
  ETH = "m/44'/60'/0'/0",
  TRX = "m/44'/195'/0'/0",
}
