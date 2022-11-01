import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load MD5 wasm
 */
export const prepareMD5 = createWasmPreparer('md5', 16);

/**
 * Calculates MD5 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const md5 = async (data: IDataType) => {
  return (await prepareMD5()).calculate(data);
};

/**
 * Creates a new MD5 hash instance
 */
export const createMD5 = async () => {
  return createMD5Sync(await prepareMD5());
};

/**
 * Creates a new MD5 hash instance
 */
export const createMD5Sync = (wasm = prepareMD5.wasm) => {
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
    digestSize: 16,
  };
  return obj;
};
