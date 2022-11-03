import { prepareSHA256 } from '../hash-wasm/sha256.mjs';

export const prepareBs58check = async () => {
  await prepareSHA256.prepare();
};
