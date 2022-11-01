import { IDataType, validateSeed } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';
/**
 * Load xxHash32 wasm
 */
export const prepareXXHash32 = createWasmPreparer('xxhash32', 4);

/**
 * Calculates xxHash32 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param seed Number used to initialize the internal state of the algorithm (defaults to 0)
 * @returns Computed hash as a hexadecimal string
 */
export const xxhash32 = async (data: IDataType, seed = 0) => {
  validateSeed(seed);
  return (await prepareXXHash32()).calculate(data, seed);
};

/**
 * Creates a new xxHash32 hash instance
 * @param data Input data (string, Buffer or TypedArray)
 * @param seed Number used to initialize the internal state of the algorithm (defaults to 0)
 */
export const createXXHash32 = async (seed = 0) => {
  return createXXHash32Sync(seed, await prepareXXHash32());
};

/**
 * Creates a new xxHash32 hash instance
 * @param data Input data (string, Buffer or TypedArray)
 * @param seed Number used to initialize the internal state of the algorithm (defaults to 0)
 */
export const createXXHash32Sync = (seed = 0, wasm = prepareXXHash32.wasm) => {
  validateSeed(seed);

  wasm.init(seed);
  const obj: IHasher = {
    init: () => {
      wasm.init(seed);
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
    blockSize: 16,
    digestSize: 4,
  };
  return obj;
};
