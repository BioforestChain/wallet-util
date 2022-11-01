import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load Adler32 wasm
 */
export const prepareAdler32 = createWasmPreparer('adler32', 4);

/**
 * Calculates Adler-32 hash. The resulting 32-bit hash is stored in
 * network byte order (big-endian).
 *
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const adler32 = async (data: IDataType) => {
  return (await prepareAdler32()).calculate(data);
};

/**
 * Creates a new Adler-32 hash instance
 */
export const createAdler32 = async () => {
  return createAdler32Sync(await prepareAdler32());
};

/**
 * Creates a new Adler-32 hash instance
 */
export const createAdler32Sync = (wasm = prepareAdler32.wasm) => {
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
    blockSize: 4,
    digestSize: 4,
  };
  return obj;
};
