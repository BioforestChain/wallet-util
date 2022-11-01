import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load SM3 wasm
 */
export const prepareSM3 = createWasmPreparer('sm3', 32);

/**
 * Calculates SM3 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const sm3 = async (data: IDataType) => {
  return (await prepareSM3()).calculate(data);
};

/**
 * Creates a new SM3 hash instance
 */
export const createSM3 = async () => {
  return createSM3Sync(await prepareSM3());
};

/**
 * Creates a new SM3 hash instance
 */
export const createSM3Sync = (wasm = prepareSM3.wasm) => {
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
    digestSize: 32,
  };
  return obj;
};
