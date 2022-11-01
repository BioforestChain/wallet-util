import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load SHA-512 wasm
 */
export const prepareSHA512 = createWasmPreparer('sha512', 64);

/**
 * Calculates SHA-2 (SHA-512) hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const sha512 = async (data: IDataType) => {
  return (await prepareSHA512()).calculate(data, 512);
};

/**
 * Creates a new SHA-2 (SHA-512) hash instance
 */
export const createSHA512 = async () => {
  return createSHA512Sync(await prepareSHA512());
};

/**
 * Creates a new SHA-2 (SHA-512) hash instance
 */
export const createSHA512Sync = (wasm = prepareSHA512.wasm) => {
  wasm.init(512);
  const obj: IHasher = {
    init: () => {
      wasm.init(512);
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
    blockSize: 128,
    digestSize: 64,
  };
  return obj;
};
