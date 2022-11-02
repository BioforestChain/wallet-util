import { prepareRIPEMD160 } from '../hash-wasm/ripemd160.mjs';
import { prepareSHA256 } from '../hash-wasm/sha256.mjs';
import { prepareSHA512 } from '../hash-wasm/sha512.mjs';
export const prepareCrypto = async () => {
  await prepareRIPEMD160.prepare();
  await prepareSHA256.prepare();
  await prepareSHA512.prepare();
};
