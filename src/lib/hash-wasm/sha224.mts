import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load SHA-224 wasm
 */
export const prepareSHA224 = createWasmPreparer('sha256', 28);

/**
 * Calculates SHA-2 (SHA-224) hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const sha224 = async (data: IDataType) => {
  return (await prepareSHA224()).calculate(data, 224);
};

/**
 * Creates a new SHA-2 (SHA-224) hash instance
 */
export const createSHA224 = async () => {
  return createSHA224Sync(await prepareSHA224());
};

/**
 * Creates a new SHA-2 (SHA-224) hash instance
 */
export const createSHA224Sync = (wasm = prepareSHA224.wasm) => {
  wasm.init(224);
  const obj: IHasher = {
    init: () => {
      wasm.init(224);
      return obj;
    },
    update: (data) => {
      wasm.update(data);
      return obj;
    },
    digest: (outputType) => wasm.digest(outputType) as any,
    save: () => wasm.save(),
    load: (data) => {
      wasm.load(data);
      return obj;
    },
    blockSize: 64,
    digestSize: 28,
  };
  return obj;
};
