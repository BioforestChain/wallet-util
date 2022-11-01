import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load SHA-384 wasm
 */
export const prepareSHA384 = createWasmPreparer('sha512', 48);

/**
 * Calculates SHA-2 (SHA-384) hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const sha384 = async (data: IDataType) => {
  return (await prepareSHA384()).calculate(data, 384);
};

/**
 * Creates a new SHA-2 (SHA-384) hash instance
 */
export const createSHA384 = async () => {
  return createSHA384Sync(await prepareSHA384());
};

/**
 * Creates a new SHA-2 (SHA-384) hash instance
 */
export const createSHA384Sync = (wasm = prepareSHA384.wasm) => {
  wasm.init(384);
  const obj: IHasher = {
    init: () => {
      wasm.init(384);
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
    digestSize: 48,
  };
  return obj;
};
