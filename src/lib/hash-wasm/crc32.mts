import { IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load CRC-32 wasm
 */
export const prepareCRC32 = createWasmPreparer('crc32', 4);

/**
 * Calculates CRC-32 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const crc32 = async (data: IDataType) => {
  return (await prepareCRC32()).calculate(data, 0xedb88320);
};

/**
 * Creates a new CRC-32 hash instance
 */
export const createCRC32 = async () => {
  return createCRC32Sync(await prepareCRC32());
};

/**
 * Creates a new CRC-32 hash instance
 */
export const createCRC32Sync = (wasm = prepareCRC32.wasm) => {
  wasm.init(0xedb88320);
  const obj: IHasher = {
    init: () => {
      wasm.init(0xedb88320);
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
