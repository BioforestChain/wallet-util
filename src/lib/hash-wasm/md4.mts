import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load MD4 wasm
 */
export const prepareMD4 = createWasmPreparer('md4', 16);

/**
 * Calculates MD4 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const md4 = async (data: IDataType) => {
  return (await prepareMD4()).calculate(data);
};

/**
 * Creates a new MD4 hash instance
 */
export const createMD4 = async () => {
  return createMD4Sync(await prepareMD4());
};

/**
 * Creates a new MD4 hash instance
 */
export const createMD4Sync = (wasm = prepareMD4.wasm) => {
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
