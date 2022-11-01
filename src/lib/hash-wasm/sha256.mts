import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load SHA-256 wasm
 */
export const prepareSHA256 = createWasmPreparer('sha256', 32);

/**
 * Calculates SHA-2 (SHA-256) hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const sha256 = async (data: IDataType) => {
  return (await prepareSHA256()).calculate(data, 256);
};

/**
 * Creates a new SHA-2 (SHA-256) hash instance
 */
export const createSHA256 = async () => {
  return createSHA256Sync(await prepareSHA256());
};

/**
 * Creates a new SHA-256 hash instance
 */
export const createSHA256Sync = (wasm = prepareSHA256.wasm) => {
  wasm.init(256);
  const obj: IHasher = {
    init: () => {
      wasm.init(256);
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
    digestSize: 32,
  };
  return obj;
};
