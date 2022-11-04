import type { $Language, $WordList } from './lib/bip39/wordlists/_types.mjs';
import { randomBytes } from './lib/crypto.mjs';
import { Buffer } from './lib/buffer.mjs';
import type {
  $CoinName,
  $DerivationPath,
} from './lib/networks-extensions/coins.mjs';
import {
  getBitcoin,
  getBip32,
  getNetworks,
  getEthereumUtil,
  getEcpair,
  getBip39,
} from './modules.mjs';
import { BIP32Interface } from './lib/bip32/bip32.mjs';
export { randomBytes, Buffer };

/** 生成助记词 */
export const generateRandomMnemonic = async (
  length = 12,
  language: $Language = 'english',
) => {
  const { getWordList } = await import('./lib/bip39/wordlists.mjs');
  const { generateMnemonic, mnemonicToSeed } = await import(
    './lib/bip39/index.mjs'
  );

  const numWords = length;
  const strength = (numWords / 3) * 32;
  const byteArray = randomBytes(strength / 8);
  if (byteArray.length % 4 > 0) {
    throw (
      'Data length in bits should be divisible by 32, but it is not (' +
      byteArray.length +
      ' bytes = ' +
      byteArray.length * 8 +
      ' bits).'
    );
  }
  const wordList = await getWordList(language);
  const mnemonic = await generateMnemonic(strength, randomBytes, wordList);
  const seedBuff = await mnemonicToSeed(mnemonic);
  return {
    mnemonic,
    seedBuff,
  };
};

/** 计算基于币种派生路径的地址 */
export const calcForDerivationPath = async (
  coinName: $CoinName,
  seed: string,
  index = 0,
) => {
  const bitcoin = await getBitcoin();
  const networks = await getNetworks();
  const bip32 = await getBip32();

  const networkInfo = await networks.getCoin(coinName);
  const derivationPath = networkInfo.derivationPath;

  const bip32RootKey = bip32.fromSeed(
    Buffer.from(seed, 'hex'),
    networkInfo.network,
  );
  const bip32ExtendedKey = calcBip32ExtendedKey(bip32RootKey, derivationPath);
  if (undefined == bip32ExtendedKey) {
    throw new Error(
      `derivationPath: ${derivationPath} not find bip32ExtendedKey.`,
    );
  }

  const keyPair = bip32ExtendedKey.derive(index);

  let address = keyPair.toBase58();
  const hasPrivkey = !keyPair.isNeutered();
  let privkey = 'NA';
  if (hasPrivkey) {
    privkey = keyPair.toWIF();
  }
  let pubkey = keyPair.publicKey.toString('hex');
  // Ethereum values are different
  if (networks.etc.isEthereum(coinName)) {
    const pubkeyBuffer = keyPair.publicKey;
    const ethUtil = await getEthereumUtil();

    const ethPubkey = await ethUtil.importPublic(pubkeyBuffer);
    const addressBuffer = await ethUtil.publicToAddress(ethPubkey);
    const hexAddress = ethUtil.addHexPrefix(addressBuffer.toString('hex'));
    const checksumAddress = await ethUtil.toChecksumAddress(hexAddress);
    address = ethUtil.addHexPrefix(checksumAddress);
    pubkey = ethUtil.addHexPrefix(pubkey);
    if (hasPrivkey) {
      privkey = ethUtil.bufferToHex(keyPair.privateKey!);
    }
  }
  // TRX is different
  if (networks.tron.isTron(coinName)) {
    const ethUtil = await getEthereumUtil();
    const ecpair = await getEcpair();
    const ecPair = ecpair.fromPrivateKey(keyPair.privateKey!, {
      network: networks.networks.bitcoin,
      compressed: false,
    });

    const pubkeyBuffer = ecPair.publicKey;
    const ethPubkey = await ethUtil.importPublic(pubkeyBuffer);
    const addressBuffer = await ethUtil.publicToAddress(ethPubkey);
    console.log('addressBuffer', addressBuffer);
    address = bitcoin.address.toBase58Check(addressBuffer, 0x41);
    if (hasPrivkey) {
      privkey = ecPair.privateKey!.toString('hex');
    }
  }

  if (networks.rsk.isRsk(coinName)) {
    const pubkeyBuffer = keyPair.publicKey;
    const ethUtil = await getEthereumUtil();
    const ethPubkey = await ethUtil.importPublic(pubkeyBuffer);
    const addressBuffer = await ethUtil.publicToAddress(ethPubkey);
    var hexAddress = addressBuffer.toString('hex');
    // Use chainId based on selected network
    // Ref: https://developers.rsk.co/rsk/architecture/account-based/#chainid
    let chainId: number | undefined;
    switch (coinName) {
      case 'R-BTC - RSK':
        chainId = 30;
        break;
      case 'tR-BTC - RSK Testnet':
        chainId = 31;
        break;
    }

    const toChecksumAddressForRsk = (address: string, chainId?: number) => {
      if (typeof address !== 'string') {
        throw new Error('address parameter should be a string.');
      }

      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        throw new Error('Given address is not a valid RSK address: ' + address);
      }

      const stripAddress = ethUtil.stripHexPrefix(address).toLowerCase();
      const prefix = chainId != null ? chainId.toString() + '0x' : '';
      const keccakHash = ethUtil.keccakHex(prefix + stripAddress, 256);
      let checksumAddress = '0x';

      for (let i = 0; i < stripAddress.length; i++) {
        checksumAddress +=
          parseInt(keccakHash[i], 16) >= 8
            ? stripAddress[i].toUpperCase()
            : stripAddress[i];
      }

      return checksumAddress;
    };
    var checksumAddress = toChecksumAddressForRsk(hexAddress, chainId);
    address = ethUtil.addHexPrefix(checksumAddress);
    pubkey = ethUtil.addHexPrefix(pubkey);
    if (hasPrivkey) {
      privkey = ethUtil.bufferToHex(keyPair.privateKey!);
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
};

function calcBip32ExtendedKey(
  bip32RootKey: BIP32Interface,
  path: $DerivationPath,
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

/**寻找错误 */
export const findPhraseErrors = async (
  phrase: string,
  language?: $Language,
) => {
  const { bip39, wordlists } = await getBip39();

  const words = phraseToWordArray(bip39.normalize(phrase));
  // Detect blank phrase
  if (words.length == 0) {
    return 'Blank mnemonic';
  }
  if (language === undefined) {
    language = await getLanguageFromWords(words);
  }
  if (language === undefined) {
    return 'Cannot be matched to any language';
  }

  const wordlist = await wordlists.getWordList(language);
  const wordset = new Set(wordlist);
  // Check each word
  for (const word of words) {
    if (wordset.has(word) === false) {
      console.log('Finding closest match to ' + word);
      const nearestWord = await _findNearestWord(word, wordlist);
      return word + ' not in wordlist, did you mean ' + nearestWord + '?';
    }
  }
  if (bip39.validateMnemonic(phrase) === false) {
    return 'Invalid mnemonic';
  }
};
const _findNearestWord = async (word: string, wordlist: string[]) => {
  const { closest } = await import('./lib/fastest-levenshtein/index.mjs');

  return closest(word, wordlist);
};

/**寻找最接近的单词 */
export const findNearestWord = async (word: string, language: $Language) => {
  const { wordlists } = await getBip39();
  return await _findNearestWord(word, await wordlists.getWordList(language));
};

export const phraseToWordArray = (phrase: string) => {
  return phrase.trim().split(/\s+/);
};

export const wordArrayToPhrase = async (
  words: $WordList,
  language?: $Language,
) => {
  let sep = ' ';
  if (language === undefined) {
    language = await getLanguageFromWords(words);
  }
  if (language === 'japanese') {
    sep = '\u3000';
  }
  return words.join(sep);
};

export const getLanguageFromPhrase = async (phrase: string) => {
  // Check if how many words from existing phrase match a language.
  return getLanguageFromWord(phrase.match(/[^\s\n]+/)?.[0]);
};

export const getLanguageFromWords = async (words: $WordList) => {
  for (const word of words) {
    const lang = await getLanguageFromWord(word);
    if (lang !== undefined) {
      return lang;
    }
  }
};

export const getLanguageFromWord = async (word?: string) => {
  if (!word) {
    return;
  }
  const { wordlists } = await getBip39();
  for (const language of wordlists.ALL_LANGUAGE) {
    const wordlist = await wordlists.getWordList(language);
    if (wordlist.includes(word)) {
      return language;
    }
  }
};
