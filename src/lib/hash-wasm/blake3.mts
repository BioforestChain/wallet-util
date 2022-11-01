import { getUInt8Buffer, IDataType, validateBits } from './util.mjs';
import {
  $WasmPreparer,
  createWasmPreparer,
  IHasher,
} from './WASMInterface.mjs';

const blake3PreparerCache = new Map<number, $WasmPreparer>();
/**
 * Load BLAKE3 wasm
 */
export const getBLAKE3Preparer = (bits: number) => {
  validateBits(bits, Infinity);
  const hashLength = bits / 8;
  let preparer = blake3PreparerCache.get(hashLength);
  if (preparer === undefined) {
    preparer = createWasmPreparer('blake3', hashLength);
    blake3PreparerCache.set(hashLength, preparer);
  }
  return preparer;
};

const parseKey = (key?: IDataType) => {
  let keyBuffer: Uint8Array | undefined;
  let initParam = 0; // key is empty by default
  if (key !== undefined) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length !== 32) {
      throw new Error('Key length must be exactly 32 bytes');
    }
    initParam = 32;
  }
  return { keyBuffer, initParam };
};
/**
 * Calculates BLAKE3 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8. Defaults to 256.
 * @param key Optional key (string, Buffer or TypedArray). Length should be 32 bytes.
 * @returns Computed hash as a hexadecimal string
 */
export const blake3 = async (data: IDataType, bits = 256, key?: IDataType) => {
  const wasm = await getBLAKE3Preparer(bits)();
  const { keyBuffer, initParam } = parseKey(key);

  if (initParam === 32) {
    wasm.writeMemory(keyBuffer!);
  }
  return wasm.calculate(data, initParam, bits / 8);
};

/**
 * Creates a new BLAKE3 hash instance
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8. Defaults to 256.
 * @param key Optional key (string, Buffer or TypedArray). Length should be 32 bytes.
 */
export const createBLAKE3 = async (bits = 256, key?: IDataType) => {
  return createBLAKE3Sync(bits, key, await getBLAKE3Preparer(bits)());
};

/**
 * Creates a new BLAKE3 hash instance
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8. Defaults to 256.
 * @param key Optional key (string, Buffer or TypedArray). Length should be 32 bytes.
 */
export const createBLAKE3Sync = (
  bits = 256,
  key?: IDataType,
  wasm = getBLAKE3Preparer(bits).wasm,
) => {
  const { keyBuffer, initParam } = parseKey(key);
  const digestSize = bits / 8;

  if (initParam === 32) {
    wasm.writeMemory(keyBuffer!);
  }
  wasm.init(initParam);

  const obj: IHasher = {
    init:
      initParam === 32
        ? () => {
            wasm.writeMemory(keyBuffer!);
            wasm.init(initParam);
            return obj;
          }
        : () => {
            wasm.init(initParam);
            return obj;
          },
    update: (data) => {
      wasm.update(data);
      return obj;
    },
    digest: (outputType) => wasm.digest(outputType, digestSize) as any,
    save: () => wasm.save(),
    load: (data) => {
      wasm.load(data);
      return obj;
    },
    blockSize: 64,
    digestSize,
  };
  return obj;
};
