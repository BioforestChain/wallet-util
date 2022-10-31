import lockedCreate from './lockedCreate.mjs';
import Mutex from './mutex.mjs';
import { IDataType } from './util.mjs';
import {
  $WASM_NAME,
  IHasher,
  IWASMInterface,
  WASMInterface,
} from './WASMInterface.mjs';
const WASM_NAME: $WASM_NAME = 'sha3';

type IValidBits = 224 | 256 | 384 | 512;
const mutex = new Mutex();
let wasmCache: IWASMInterface;

function validateBits(bits: IValidBits) {
  if (![224, 256, 384, 512].includes(bits)) {
    return new Error('Invalid variant! Valid values: 224, 256, 384, 512');
  }

  return null;
}

/**
 * Calculates Keccak hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param bits Number of output bits. Valid values: 224, 256, 384, 512
 * @returns Computed hash as a hexadecimal string
 */
export function keccak(
  data: IDataType,
  bits: IValidBits = 512,
): Promise<string> {
  if (validateBits(bits)) {
    return Promise.reject(validateBits(bits));
  }

  const hashLength = bits / 8;

  if (wasmCache === undefined || wasmCache.hashLength !== hashLength) {
    return lockedCreate(mutex, WASM_NAME, hashLength).then((wasm) => {
      wasmCache = wasm;
      return wasmCache.calculate(data, bits, 0x01);
    });
  }

  try {
    const hash = wasmCache.calculate(data, bits, 0x01);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Creates a new Keccak hash instance
 * @param bits Number of output bits. Valid values: 224, 256, 384, 512
 */
export function createKeccak(bits: IValidBits = 512): Promise<IHasher> {
  if (validateBits(bits)) {
    return Promise.reject(validateBits(bits));
  }

  const outputSize = bits / 8;

  return WASMInterface(WASM_NAME, outputSize).then((wasm) => {
    wasm.init(bits);
    const obj: IHasher = {
      init: () => {
        wasm.init(bits);
        return obj;
      },
      update: (data) => {
        wasm.update(data);
        return obj;
      },
      digest: (outputType) => wasm.digest(outputType, 0x01) as any,
      save: () => wasm.save(),
      load: (data) => {
        wasm.load(data);
        return obj;
      },
      blockSize: 200 - 2 * outputSize,
      digestSize: outputSize,
    };
    return obj;
  });
}
