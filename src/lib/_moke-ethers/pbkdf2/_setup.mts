import { prepareSHA256 } from '../../hash-wasm/sha256.mjs';
import { prepareSHA512 } from '../../hash-wasm/sha512.mjs';
export const preparePbkdf2 = async () => {
  await Promise.all([prepareSHA256(), prepareSHA512()]);
};
