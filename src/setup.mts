import { Buffer } from './lib/buffer.mjs';
import { randomBytes } from './lib/crypto.mjs';
import { cacheCall } from './lib/utils.mjs';
export { randomBytes, Buffer };

export const getBitcoin = cacheCall(async () => {
  const { prepareBitcoinLib } = await import('./lib/bitcoin-lib/_setup.mjs');
  await prepareBitcoinLib();
  const address = await import('./lib/bitcoin-lib/address.mjs');
  const payments = await import('./lib/bitcoin-lib/payments/index.mjs');
  const psbt = await import('./lib/bitcoin-lib/psbt.mjs');
  const script = await import('./lib/bitcoin-lib/script.mjs');
  return {
    address,
    payments,
    psbt,
    script,
  };
});

export const getTinySecp256k1 = cacheCall(async () => {
  const { prepareTinySecp256k1 } = await import(
    './lib/tiny-secp256k1/_setup.mjs'
  );
  await prepareTinySecp256k1();
  return await import('./lib/tiny-secp256k1/index.mjs');
});

export const getBip39 = cacheCall(async () => {
  const { prepareBip39 } = await import('./lib/bip39/_setup.mjs');
  await prepareBip39();

  const wordlists = await import('./lib/bip39/wordlists.mjs');
  const bip39 = await import('./lib/bip39/index.mjs');
  return {
    wordlists,
    bip39,
  };
});

export const getBip32 = cacheCall(async () => {
  const [ecc, { prepareBip32 }] = await Promise.all([
    getTinySecp256k1(),
    import('./lib/bip32/_setup.mjs'),
  ]);
  await prepareBip32();

  const { BIP32Factory } = await import('./lib/bip32/bip32.mjs');
  return BIP32Factory(ecc);
});

export const getEcpair = cacheCall(async () => {
  const [ecc, { prepareEcpair }] = await Promise.all([
    getTinySecp256k1(),
    import('./lib/ecpair/_setup.mjs'),
  ]);
  await prepareEcpair();

  const { ECPairFactory } = await import('./lib/ecpair/ecpair.mjs');
  return ECPairFactory(ecc);
});

export const getNetworks = cacheCall(() => {
  return import('./lib/networks-extensions/index.mjs');
});

export const getEthereumUtil = cacheCall(async () => {
  const { prepareEthereumUtil } = await import(
    './lib/ethereum-util/_setup.mjs'
  );
  await prepareEthereumUtil();
  return await import('./lib/ethereum-util/index.mjs');
});
