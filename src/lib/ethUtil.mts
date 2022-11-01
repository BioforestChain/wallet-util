import node_buffer from '../../assets/buffer/index.cjs';
const { Buffer } = node_buffer;

import { createKeccak, keccak as keccakHex } from './hash-wasm/index.mjs';
export { keccakHex };

const setupTinySecp256k1 = () =>
  import('./tiny-secp256k1/index.mjs').then(({ setupTinySecp256k1 }) =>
    setupTinySecp256k1(),
  );

export const keccak256Buffer = async (publicKey: Uint8Array) => {
  const hash = await createKeccak(256);
  return Buffer.from(hash.update(publicKey).digest('hex'), 'hex');
};

export const importPublic = async (publickKey: Uint8Array) => {
  if (publickKey.length !== 64) {
    publickKey = (await setupTinySecp256k1())
      .pointCompress(publickKey, false)
      .slice(1);
  }
  return publickKey;
};
export const publicToAddress = async (pubKey: Uint8Array) => {
  return (await keccak256Buffer(pubKey)).slice(-20);
};

export const addHexPrefix = (str: string) => {
  return isHexPrefixed(str) ? str : `0x${str}`;
};
export const isHexPrefixed = (str: string) => {
  return str.startsWith('0x');
};

export const bufferToHex = (buf: Buffer) => {
  return `0x${buf.toString('hex')}`;
};
export const stripHexPrefix = (address: string) => {
  return /^0x/i.test(address) ? address.slice(2) : address;
};

export const toChecksumAddress = async (address: string) => {
  address = stripHexPrefix(address).toLowerCase();
  const hash = await keccakHex(address, 256);
  let ret = '0x';
  for (let i = 0; i < address.length; i++) {
    const char = address[i];
    if (parseInt(hash[i], 16) >= 8) {
      ret += char.toUpperCase();
    } else {
      ret += char;
    }
  }
  return ret;
};
