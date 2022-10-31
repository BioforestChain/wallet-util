import {
  $WASM_NAME,
  WASMInterface,
  IWASMInterface,
  IHasher,
} from './WASMInterface.mjs';
import Mutex from './mutex.mjs';
const WASM_NAME: $WASM_NAME = 'sha1';
import lockedCreate from './lockedCreate.mjs';
import { IDataType } from './util.mjs';

const mutex = new Mutex();
let wasmCache: IWASMInterface;

/**
 * Calculates SHA-1 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export function sha1(data: IDataType): Promise<string> {
  if (wasmCache === undefined) {
    return lockedCreate(mutex, WASM_NAME, 20).then((wasm) => {
      wasmCache = wasm;
      return wasmCache.calculate(data);
    });
  }

  try {
    const hash = wasmCache.calculate(data);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Creates a new SHA-1 hash instance
 */
export function createSHA1(): Promise<IHasher> {
  return WASMInterface(WASM_NAME, 20).then((wasm) => {
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
  });
}
