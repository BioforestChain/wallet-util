import lockedCreate from './lockedCreate.mjs';
import Mutex from './mutex.mjs';
import { IDataType } from './util.mjs';
import {
  $WASM_NAME,
  IHasher,
  IWASMInterface,
  WASMInterface,
} from './WASMInterface.mjs';
const WASM_NAME: $WASM_NAME = 'sha256';

const mutex = new Mutex();
let wasmCache: IWASMInterface;

/**
 * Calculates SHA-2 (SHA-256) hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export function sha256(data: IDataType): Promise<string> {
  if (wasmCache === undefined) {
    return lockedCreate(mutex, WASM_NAME, 32).then((wasm) => {
      wasmCache = wasm;
      return wasmCache.calculate(data, 256);
    });
  }

  try {
    const hash = wasmCache.calculate(data, 256);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Creates a new SHA-2 (SHA-256) hash instance
 */
export function createSHA256(): Promise<IHasher> {
  return WASMInterface(WASM_NAME, 32).then((wasm) => {
    wasm.init(256);
    const obj: IHasher = {
      init: () => {
        wasm.init(256);
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
  });
}
