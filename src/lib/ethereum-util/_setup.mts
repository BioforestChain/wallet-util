import { prepareTinySecp256k1 } from '../tiny-secp256k1/_setup.mjs';
import { getSha3Preparer } from '../hash-wasm/sha3.mjs';
export const prepareEthereumUtil = async () => {
  await prepareTinySecp256k1();
  await getSha3Preparer(224).prepare();
  await getSha3Preparer(256).prepare();
  await getSha3Preparer(384).prepare();
  await getSha3Preparer(512).prepare();
};
