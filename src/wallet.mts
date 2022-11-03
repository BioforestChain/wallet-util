import type { $Language } from './lib/bip39/wordlists/_types.mjs';
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
  if (networks.etc.isEthereum(coinName)) {
    const pubkeyBuffer = key.publicKey;
    const ethUtil = await getEthereumUtil();

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
  if (networks.tron.isTron(coinName)) {
    const ethUtil = await getEthereumUtil();
    const ecpair = await getEcpair();
    const keyPair = ecpair.fromPrivateKey(key.privateKey!, {
      network: networks.networks.bitcoin,
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

// function findDerivationPathErrors(
//   path: string,
//   bip32RootKey?: import('./lib/bip32/bip32.mjs').BIP32Interface,
//   hardenedAddresses?: boolean,
// ) {
//   // TODO is not perfect but is better than nothing
//   // Inspired by
//   // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors
//   // and
//   // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys
//   var maxDepth = 255; // TODO verify this!!
//   var maxIndexValue = Math.pow(2, 31); // TODO verify this!!
//   if (path[0] != 'm') {
//     return "First character must be 'm'";
//   }
//   if (path.length > 1) {
//     if (path[1] != '/') {
//       return "Separator must be '/'";
//     }
//     var indexes = path.split('/');
//     if (indexes.length > maxDepth) {
//       return (
//         'Derivation depth is ' +
//         indexes.length +
//         ', must be less than ' +
//         maxDepth
//       );
//     }
//     for (var depth = 1; depth < indexes.length; depth++) {
//       var index = indexes[depth];
//       var invalidChars = index.replace(/^[0-9]+'?$/g, '');
//       if (invalidChars.length > 0) {
//         return (
//           'Invalid characters ' + invalidChars + ' found at depth ' + depth
//         );
//       }
//       var indexValue = parseInt(index.replace("'", ''));
//       if (isNaN(depth)) {
//         return 'Invalid number at depth ' + depth;
//       }
//       if (indexValue > maxIndexValue) {
//         return (
//           'Value of ' +
//           indexValue +
//           ' at depth ' +
//           depth +
//           ' must be less than ' +
//           maxIndexValue
//         );
//       }
//     }
//   }
//   // Check root key exists or else derivation path is useless!
//   if (!bip32RootKey) {
//     return 'No root key';
//   }
//   // Check no hardened derivation path when using xpub keys
//   var hardenedPath = path.indexOf("'") > -1;
//   var hardened = hardenedPath || hardenedAddresses;
//   var isXpubkey = bip32RootKey.isNeutered();
//   if (hardened && isXpubkey) {
//     return 'Hardened derivation path is invalid with xpub key';
//   }
//   return false;
// }

// function calcForDerivationPath2(derivationPath:string) {
//   clearDerivedKeys();
//   clearAddressesList();
//   showPending();
//   // Don't show segwit if it's selected but network doesn't support it
//   if (segwitSelected() && !networkHasSegwit()) {
//     showSegwitUnavailable();
//     hidePending();
//     return;
//   }
//   showSegwitAvailable();
//   // Get the derivation path
//   var derivationPath = getDerivationPath();
//   var errorText = findDerivationPathErrors(derivationPath);
//   if (errorText) {
//     showValidationError(errorText);
//     return;
//   }
//   bip32ExtendedKey = calcBip32ExtendedKey(derivationPath);
//   if (bip44TabSelected()) {
//     displayBip44Info();
//   } else if (bip49TabSelected()) {
//     displayBip49Info();
//   } else if (bip84TabSelected()) {
//     displayBip84Info();
//   }
//   displayBip32Info();
// }
