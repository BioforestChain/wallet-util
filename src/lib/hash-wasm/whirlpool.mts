import lockedCreate from './lockedCreate.mjs';
import Mutex from './mutex.mjs';
import { IDataType } from './util.mjs';
import {
  $WASM_NAME,
  IHasher,
  IWASMInterface,
  WASMInterface,
} from './WASMInterface.mjs';
const WASM_NAME: $WASM_NAME = 'whirlpool';

const mutex = new Mutex();
let wasmCache: IWASMInterface;

/**
 * Calculates Whirlpool hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export function whirlpool(data: IDataType): Promise<string> {
  if (wasmCache === undefined) {
    return lockedCreate(mutex, WASM_NAME, 64).then((wasm) => {
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
 * Creates a new Whirlpool hash instance
 */
export function createWhirlpool(): Promise<IHasher> {
  return WASMInterface(WASM_NAME, 64).then((wasm) => {
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
  });
}
