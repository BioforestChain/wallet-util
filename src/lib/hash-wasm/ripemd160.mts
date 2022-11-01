import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load RIPEMD-160 wasm
 */
export const prepareRIPEMD160 = createWasmPreparer('ripemd160', 20);

/**
 * Calculates RIPEMD-160 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const ripemd160 = async (data: IDataType) => {
  return (await prepareRIPEMD160()).calculate(data);
};

/**
 * Creates a new RIPEMD-160 hash instance
 */
export const createRIPEMD160 = async () => {
  return createRIPEMD160Sync(await prepareRIPEMD160());
};

/**
 * Creates a new RIPEMD-160 hash instance
 */
export const createRIPEMD160Sync = (wasm = prepareRIPEMD160.wasm) => {
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
