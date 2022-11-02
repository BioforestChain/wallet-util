import { prepareCrypto as prepareBs58checkCrypto } from '../bs58check/index.mjs';
import { prepareRIPEMD160 } from '../hash-wasm/ripemd160.mjs';
import { prepareSHA1 } from '../hash-wasm/sha1.mjs';
import { prepareSHA256 } from '../hash-wasm/sha256.mjs';

export const prepareCrypto = async () => {
  await prepareBs58checkCrypto();
  await prepareRIPEMD160.prepare();
  await prepareSHA1.prepare();
  await prepareSHA256.prepare();
};
