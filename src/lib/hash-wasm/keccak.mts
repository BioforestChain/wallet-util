import { $IValidBits, getSha3Preparer } from './sha3.mjs';
import { IDataType } from './util.mjs';
import { IHasher } from './WASMInterface.mjs';

/**
 * Calculates Keccak hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param bits Number of output bits. Valid values: 224, 256, 384, 512
 * @returns Computed hash as a hexadecimal string
 */
export const keccak = async (data: IDataType, bits: $IValidBits = 512) => {
  return (await getSha3Preparer(bits)()).calculate(data, bits, 0x01);
};

/**
 * Creates a new Keccak hash instance
 * @param bits Number of output bits. Valid values: 224, 256, 384, 512
 */
export const createKeccak = async (bits: $IValidBits = 512) => {
  return createKeccakSync(bits, await getSha3Preparer(bits)());
};

export const createKeccakSync = (
  bits: $IValidBits = 512,
  wasm = getSha3Preparer(bits).wasm,
) => {
  const outputSize = bits / 8;

  wasm.init(bits);
  const obj: IHasher = {
    init: () => {
      wasm.init(bits);
      return obj;
    },
    update: (data) => {
      wasm.update(data);
      return obj;
    },
    digest: (outputType) => wasm.digest(outputType, 0x01) as any,
    save: () => wasm.save(),
    load: (data) => {
      wasm.load(data);
      return obj;
    },
    blockSize: 200 - 2 * outputSize,
    digestSize: outputSize,
  };
  return obj;
};
