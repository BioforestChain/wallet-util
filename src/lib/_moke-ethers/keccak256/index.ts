import { createKeccakSync } from '../../hash-wasm/keccak.mjs';

export const keccak256 = (data: Uint8Array) => {
  return '0x' + createKeccakSync(256).update(data).digest('hex');
};
