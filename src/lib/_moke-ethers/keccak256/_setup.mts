import { getSha3Preparer } from '../../hash-wasm/sha3.mjs';

export const prepareKeccak256 = async () => {
  await getSha3Preparer(256);
};
