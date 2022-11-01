import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load Whirlpool wasm
 */
export const prepareWhirlpool = createWasmPreparer('whirlpool', 64);

/**
 * Calculates Whirlpool hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const whirlpool = async (data: IDataType) => {
  return (await prepareWhirlpool()).calculate(data);
};

/**
 * Creates a new Whirlpool hash instance
 */
export const createWhirlpool = async () => {
  return createWhirlpoolSync(await prepareWhirlpool());
};

/**
 * Creates a new Whirlpool hash instance
 */
export const createWhirlpoolSync = (wasm = prepareWhirlpool.wasm) => {
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
    digestSize: 64,
  };
  return obj;
};
