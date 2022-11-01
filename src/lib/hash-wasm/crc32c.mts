import { prepareCRC32 } from './crc32.mjs';
import { IDataType } from './util.mjs';
import { IHasher } from './WASMInterface.mjs';

/**
 * Calculates CRC-32C hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export const crc32c = async (data: IDataType) => {
  return (await prepareCRC32()).calculate(data, 0x82f63b78);
};

/**
 * Creates a new CRC-32C hash instance
 */
export const createCRC32C = async () => {
  return createCRC32CSync(await prepareCRC32());
};

/**
 * Creates a new CRC-32C hash instance
 */
export const createCRC32CSync = (wasm = prepareCRC32.wasm) => {
  wasm.init(0x82f63b78);
  const obj: IHasher = {
    init: () => {
      wasm.init(0x82f63b78);
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
