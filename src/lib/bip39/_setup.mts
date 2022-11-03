import { prepareSHA256 } from '../hash-wasm/sha256.mjs';
import { prepareSHA512 } from '../hash-wasm/sha512.mjs';
export const prepareBip39 = async () => {
  await prepareSHA256.prepare();
  await prepareSHA512.prepare();
};
