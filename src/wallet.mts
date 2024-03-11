import type { BIP32Interface } from './lib/bip32/bip32.mjs';
import type { $Language, $WordList } from './lib/bip39/wordlists/_types.mjs';
import type {
  $CoinName,
  $DerivationPath,
} from './lib/networks-extensions/coins.mjs';

import {
  getBip32,
  getBip39,
  getBitcoin,
  getEcpair,
  getEthereumUtil,
  getNetworks,
  getTinySecp256k1,
} from './modules.mjs';

import { Buffer } from './lib/buffer.mjs';
import { randomBytes } from './lib/crypto.mjs';
import { type PsbtInputExtended } from './lib/bitcoin-lib/psbt.mjs';

export { randomBytes, Buffer };

export type $PurposeType = 44 | 49 | 84 | 86;

export enum AddressType {
  NATIVE_SEGWIT_P2WPKH = 'Native Segwit P2WPKH',
  NESTED_SEGWIT_P2SH_P2PKH = 'Nested Segwit P2SH_P2PKH',
  TAPROOT_P2TR = 'Taproot P2TR',
  LEGACY_P2PKH = 'Legacy P2PKH',
}

/** 生成助记词 */
export const generateRandomMnemonic = async (
  length = 12,
  language: $Language = 'english',
) => {
  const { wordlists, bip39 } = await getBip39();

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
  const wordList = await wordlists.getWordList(language);
  const mnemonic = await bip39.generateMnemonic(
    strength,
    randomBytes,
    wordList,
  );
  const seedBuff = await bip39.mnemonicToSeed(mnemonic);
  return {
    mnemonic,
    seedBuff,
  };
};

/**
 * 计算基于币种派生路径的地址
 * @param coinName
 * @param seed
 * @param index
 * @param purpose 正常现在都是使用44，但是bitcoin需要4种类型地址：44,49,84,86
 * @param externalOrInternal 固定0，但是bitcoin有区分外部跟内容（接收，找零）：0 外部，1 找零
 * @returns
 */
export const calcForDerivationPath = async (
  coinName: $CoinName,
  seed: string,
  index = 0,
  purpose: $PurposeType = 44,
  externalOrInternal: 0 | 1 = 0,
) => {
  const bitcoin = await getBitcoin();
  const networks = await getNetworks();
  const bip32 = await getBip32();

  const networkInfo = await networks.getCoin(coinName);
  let derivationPath = networkInfo.derivationPath;
  /// 由于derivationPath固定44，这里需要判断下
  if (purpose != 44) {
    derivationPath = derivationPath.replace(
      'm/44',
      `m/${purpose}`,
    ) as $DerivationPath;
  }
  if (externalOrInternal == 1) {
    derivationPath = derivationPath.replace(
      /.$/,
      String(externalOrInternal),
    ) as $DerivationPath;
  }
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
  // bitcoin
  if (networks.btc.isBitcoin(coinName)) {
    address = bitcoin.address.toBase58Check(
      keyPair.identifier,
      keyPair.network.pubKeyHash!,
    );
  }
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

  /// 判断地址类型
  const purposeTypeAddress = await checkPurposeTypeAddressFromPublicKey(
    keyPair.publicKey,
    coinName,
    purpose,
  );
  if (purposeTypeAddress) {
    address = purposeTypeAddress;
  }
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
    language =
      wordlists.getDefaultWordlist()?.language ??
      (await getLanguageFromWords(words));
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
  if (bip39.validateMnemonic(phrase, wordlist) === false) {
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
  return getLanguagesFromWord(phrase.match(/[^\s\n]+/)?.[0]);
};

export const getLanguageFromWords = async (words: $WordList) => {
  const wordsLength = words.length;
  const recordLangs = [] as $Language[];
  for (const word of words) {
    const langs = await getLanguagesFromWord(word);
    if (langs !== undefined) {
      recordLangs.push(...langs);
    }
  }
  const langOccurrence_Map = new Map<
    $Language /** language */,
    number /** count */
  >();
  recordLangs.forEach((lang) => {
    const count = langOccurrence_Map.get(lang);
    langOccurrence_Map.set(lang, count ? count + 1 : 1);
  });
  for (const [lang, count] of langOccurrence_Map) {
    if (count === wordsLength) {
      return lang;
    }
  }
};

export const getLanguagesFromWord = async (word?: string) => {
  if (!word) {
    return;
  }
  const { wordlists } = await getBip39();
  const languages = [] as $Language[];
  for (const language of wordlists.ALL_LANGUAGE) {
    const wordlist = await wordlists.getWordList(language);
    if (wordlist.includes(word)) {
      languages.push(language);
    }
  }
  return languages;
};

/**
 * 根据私钥恢复bitcoin地址
 * 根据需求的函数，非bitcoinhs-lib内函数
 */
export const getBitcoinAddressFromPrivateKey = async (
  wifString: string,
  coinName: $CoinName,
  purpose: $PurposeType,
) => {
  const ecpairApi = await getEcpair();
  const networks = await getNetworks();
  const bitcoin = await getBitcoin();
  // bitcoin
  if (networks.btc.isBitcoin(coinName) === false) {
    throw new Error(`coinName:${coinName} is not bitoin.`);
  }
  const networkInfo = await networks.getCoin(coinName);
  const ecpair = ecpairApi.fromWIF(wifString, networkInfo.network); // 导入私钥

  let address = bitcoin.address.toBase58Check(
    bitcoin.crypto.hash160(ecpair.publicKey),
    ecpair.network.pubKeyHash,
  );
  /// 判断地址类型
  const purposeTypeAddress = await checkPurposeTypeAddressFromPublicKey(
    ecpair.publicKey,
    coinName,
    purpose,
  );
  if (purposeTypeAddress) {
    address = purposeTypeAddress;
  }
  return {
    privkey: wifString,
    pubkey: ecpair.publicKey.toString('hex'),
    address,
  };
};

/**
 * 校验协议地址
 */
const checkPurposeTypeAddressFromPublicKey = async (
  publicKey: Buffer,
  coinName: $CoinName,
  purpose: $PurposeType,
) => {
  const bitcoin = await getBitcoin();
  const ecc = await getTinySecp256k1();
  const networks = await getNetworks();

  const networkInfo = await networks.getCoin(coinName);
  const isSegwit = purpose === 49 || purpose === 84;
  let address = '';
  if (isSegwit) {
    /// 细分
    const isP2wpkhInP2sh = purpose === 49;
    const isP2wpkh = purpose === 84;
    if (isP2wpkhInP2sh) {
      const keyhash = bitcoin.crypto.hash160(publicKey);
      const scriptsig = bitcoin.script.compile([
        bitcoin.OPS.OP_0,
        Buffer.from(keyhash),
      ]);
      const addressbytes = bitcoin.crypto.hash160(scriptsig);
      const scriptpubkey = bitcoin.script.compile([
        bitcoin.OPS.OP_HASH160,
        addressbytes,
        bitcoin.OPS.OP_EQUAL,
      ]);
      address = bitcoin.address.fromOutputScript(
        Buffer.from(scriptpubkey),
        networkInfo.network,
      );
    } else if (isP2wpkh) {
      const keyhash = bitcoin.crypto.hash160(publicKey);
      const scriptpubkey = bitcoin.script.compile([
        bitcoin.OPS.OP_0,
        Buffer.from(keyhash),
      ]);
      address = bitcoin.address.fromOutputScript(
        Buffer.from(scriptpubkey),
        networkInfo.network,
      );
    }
  } else if (purpose === 86) {
    const createKeySpendOutput = (publicKey: Buffer) => {
      // x-only pubkey (remove 1 byte y parity)
      const myXOnlyPubkey = publicKey.slice(1, 33);
      const commitHash = bitcoin.crypto.taggedHash('TapTweak', myXOnlyPubkey);

      const tweakResult = ecc.xOnlyPointAddTweak(myXOnlyPubkey, commitHash);
      if (tweakResult === null) throw new Error('Invalid Tweak');
      const { xOnlyPubkey: tweaked } = tweakResult;
      // scriptPubkey
      return Buffer.concat([
        // witness v1, PUSH_DATA 32 bytes
        Buffer.from([0x51, 0x20]),
        // x-only tweaked pubkey
        tweaked,
      ]);
    };
    const output = createKeySpendOutput(publicKey);
    address = bitcoin.address.fromOutputScript(
      Buffer.from(output),
      networkInfo.network,
    );
  }
  return address;
};

/** 地址类型 */
export const detectAddressType = (address: string): AddressType => {
  if (address.startsWith('tb1q') || address.startsWith('bc1q'))
    return AddressType.NATIVE_SEGWIT_P2WPKH;
  if (address.startsWith('tb1p') || address.startsWith('bc1p'))
    return AddressType.TAPROOT_P2TR;
  if (address.length > 34) return AddressType.NESTED_SEGWIT_P2SH_P2PKH;
  return AddressType.LEGACY_P2PKH;
};

/**
 * 创建bitcoin psbt格式的转账交易
 */
export const createBitcoinPsbt = async (opts: {
  coinName: $CoinName;
  privateKey: string;
  utxos: {
    txid: string;
    value: string;
    txHex: string;
    vout: number;
  }[];
  senderId: string;
  recipientId: string;
  amount: number | string;
  feeRate: number | string;
}) => {
  const {
    coinName,
    privateKey,
    utxos,
    senderId,
    recipientId,
    amount,
    feeRate,
  } = opts;

  const bitcoin = await getBitcoin();
  const networks = await getNetworks();
  const ecpair = await getEcpair();
  const bip32 = await getBip32();

  const networkInfo = await networks.getCoin(coinName);

  const psbt = new bitcoin.psbt.Psbt({ network: networkInfo.network });

  const keyPair = ecpair.fromWIF(privateKey, networkInfo.network);

  const totalUnspent_BI = utxos.reduce(
    (sum, { value }) => sum + BigInt(value),
    BigInt(0),
  );
  let amount_BI = BigInt(amount);
  const remainBalance_BI = totalUnspent_BI - amount_BI;
  /// 判断下转出数量是否大于传入的utxos总和
  if (remainBalance_BI < BigInt(0)) {
    throw new Error(
      `Total less than amount: ${totalUnspent_BI.toString()} < ${amount_BI.toString()}`,
    );
  }

  /// 每超出传入总和，开始塞入utxos
  psbt.addInputs(
    utxos.map((item) => {
      const input = { hash: item.txid, index: item.vout } as PsbtInputExtended;
      const addressType = detectAddressType(senderId);

      if (addressType != AddressType.LEGACY_P2PKH) {
        const payment = (() => {
          return bitcoin.payments.p2wpkh({
            pubkey: keyPair.publicKey,
            network: networkInfo.network,
          });
        })();
        // Add witnessUtxo data
        input['witnessUtxo'] = { script: payment.output!, value: +item.value };

        if (addressType == AddressType.TAPROOT_P2TR) {
          input['tapInternalKey'] = bip32.toXOnly(keyPair.publicKey);
        }
        if (addressType == AddressType.NESTED_SEGWIT_P2SH_P2PKH) {
          input['redeemScript'] = payment.redeem!.output;
        }
      } else {
        input['nonWitnessUtxo'] = Buffer.from(item.txHex, 'hex');
      }
      return input;
    }),
  );

  /// 计算本次手续费
  const finalFee_BI = (() => {
    const tPsbt = psbt.clone();
    tPsbt.addOutput({ address: recipientId, value: +amount_BI.toString() });
    tPsbt.addOutput({ address: senderId, value: +remainBalance_BI.toString() });
    tPsbt.signAllInputs(keyPair);
    tPsbt.finalizeAllInputs();
    const estTx = tPsbt.extractTransaction(true);
    const vBytes = estTx.virtualSize();
    return BigInt(vBytes) * BigInt(feeRate);
  })();

  /// 先判断 本次是否为全部转出
  const allSend = remainBalance_BI === BigInt(0);
  if (allSend) {
    /// 数量 - 手续费 就是 新的转移数量
    amount_BI = amount_BI - finalFee_BI;
  } else {
    /// 不是全部转的话，需要判断 手续费 + 转出 是否大于 输入
    if (totalUnspent_BI - amount_BI - finalFee_BI < BigInt(0)) {
      return {
        fee: finalFee_BI.toString(),
      };
    }
    /// 剩余数量返回回来
    psbt.addOutput({
      address: senderId,
      value: +(remainBalance_BI - finalFee_BI).toString(),
    });
  }

  /// 塞入本次要转移的人
  psbt.addOutput({ address: recipientId, value: +amount_BI.toString() });

  psbt.signAllInputs(keyPair);

  psbt.finalizeAllInputs();
  const tx = psbt.extractTransaction();
  return {
    fee: finalFee_BI.toString(),
    txHex: tx.toHex(),
  };
};
