import { createHMACSync } from 'src/lib/hash-wasm/hmac.mjs';
import { IHasher } from 'src/lib/hash-wasm/WASMInterface.mjs';
import { createRIPEMD160Sync } from '../../hash-wasm/ripemd160.mjs';
import { createSHA256Sync } from '../../hash-wasm/sha256.mjs';
import { createSHA512Sync } from '../../hash-wasm/sha512.mjs';
import { SupportedAlgorithm } from './types.mjs';

export { SupportedAlgorithm };

export const ripemd160 = (data: Uint8Array) => {
  return '0x' + createRIPEMD160Sync().update(data).digest('hex');
};
export const sha256 = (data: Uint8Array) => {
  return '0x' + createSHA256Sync().update(data).digest('hex');
};
export const sha512 = (data: Uint8Array) => {
  return '0x' + createSHA512Sync().update(data).digest('hex');
};

export const computeHmac = (
  algorithm: SupportedAlgorithm,
  key: Uint8Array,
  data: Uint8Array,
) => {
  let hasher: IHasher;

  switch (algorithm) {
    case SupportedAlgorithm.sha256:
      hasher = createSHA256Sync();
      break;
    case SupportedAlgorithm.sha512:
      hasher = createSHA512Sync();
      break;
    default:
      throw new Error(`unsupport algorithm: ${algorithm}`);
  }
  return '0x' + createHMACSync(hasher, key).update(data).digest('hex');
};
