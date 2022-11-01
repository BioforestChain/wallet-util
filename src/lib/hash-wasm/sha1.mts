import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load SHA-1 wasm
 */
export const prepareSHA1 = createWasmPreparer('sha1', 20);

/**
 * Calculates SHA-1 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const sha1 = async (data: IDataType) => {
  return (await prepareSHA1()).calculate(data);
};

/**
 * Creates a new SHA-1 hash instance
 */
export const createSHA1 = async () => {
  return createSHA1Sync(await prepareSHA1());
};

/**
 * Creates a new SHA-1 hash instance
 */
export const createSHA1Sync = (wasm = prepareSHA1.wasm) => {
  wasm.init();
  const obj: IHasher = {
    init: () => {
      wasm.init();
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
    digestSize: 20,
  };
  return obj;
};
