import lockedCreate from './lockedCreate.mjs';
import Mutex from './mutex.mjs';
import { IDataType } from './util.mjs';
import {
  $WASM_NAME,
  IHasher,
  IWASMInterface,
  WASMInterface,
} from './WASMInterface.mjs';
const WASM_NAME: $WASM_NAME = 'xxhash32';

const mutex = new Mutex();
let wasmCache: IWASMInterface;

function validateSeed(seed: number) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
    return new Error('Seed must be a valid 32-bit long unsigned integer.');
  }
  return null;
}
/**
 * Calculates xxHash32 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param seed Number used to initialize the internal state of the algorithm (defaults to 0)
 * @returns Computed hash as a hexadecimal string
 */
export function xxhash32(data: IDataType, seed = 0): Promise<string> {
  if (validateSeed(seed)) {
    return Promise.reject(validateSeed(seed));
  }

  if (wasmCache === undefined) {
    return lockedCreate(mutex, WASM_NAME, 4).then((wasm) => {
      wasmCache = wasm;
      return wasmCache.calculate(data, seed);
    });
  }

  try {
    const hash = wasmCache.calculate(data, seed);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Creates a new xxHash32 hash instance
 * @param data Input data (string, Buffer or TypedArray)
 * @param seed Number used to initialize the internal state of the algorithm (defaults to 0)
 */
export function createXXHash32(seed = 0): Promise<IHasher> {
  if (validateSeed(seed)) {
    return Promise.reject(validateSeed(seed));
  }

  return WASMInterface(WASM_NAME, 4).then((wasm) => {
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
  });
}