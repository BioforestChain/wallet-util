import lockedCreate from './lockedCreate.mjs';
import Mutex from './mutex.mjs';
import { IDataType } from './util.mjs';
import {
  $WASM_NAME,
  IHasher,
  IWASMInterface,
  WASMInterface,
} from './WASMInterface.mjs';
const WASM_NAME: $WASM_NAME = 'crc32';

const mutex = new Mutex();
let wasmCache: IWASMInterface;

/**
 * Calculates CRC-32C hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export function crc32c(data: IDataType): Promise<string> {
  if (wasmCache === undefined) {
    return lockedCreate(mutex, WASM_NAME, 4).then((wasm) => {
      wasmCache = wasm;
      return wasmCache.calculate(data, 0x82f63b78);
    });
  }

  try {
    const hash = wasmCache.calculate(data, 0x82f63b78);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Creates a new CRC-32C hash instance
 */
export function createCRC32C(): Promise<IHasher> {
  return WASMInterface(WASM_NAME, 4).then((wasm) => {
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
  });
}
