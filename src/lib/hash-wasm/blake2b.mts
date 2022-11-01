import {
  getInitParam,
  getUInt8Buffer,
  IDataType,
  validateBits,
} from './util.mjs';
import {
  $WasmPreparer,
  createWasmPreparer,
  IHasher,
} from './WASMInterface.mjs';

const blake2bPreparerCache = new Map<number, $WasmPreparer>();
/**
 * Load BLAKE2b wasm
 */
export const getBLAKE2bPreparer = (bits: number) => {
  validateBits(bits, 512);
  const hashLength = bits / 8;
  let preparer = blake2bPreparerCache.get(hashLength);
  if (preparer === undefined) {
    preparer = createWasmPreparer('blake2b', hashLength);
    blake2bPreparerCache.set(hashLength, preparer);
  }
  return preparer;
};

const parseKey = (bits: number, key?: IDataType) => {
  let keyBuffer: Uint8Array | undefined;
  let initParam = bits;
  if (key !== undefined) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length > 64) {
      throw new Error('Max key length is 64 bytes');
    }
    initParam = getInitParam(bits, keyBuffer.length);
  }
  return { keyBuffer, initParam };
};

/**
 * Calculates BLAKE2b hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8, between 8 and 512. Defaults to 512.
 * @param key Optional key (string, Buffer or TypedArray). Maximum length is 64 bytes.
 * @returns Computed hash as a hexadecimal string
 */
export const blake2b = async (data: IDataType, bits = 512, key?: IDataType) => {
  const wasm = await getBLAKE2bPreparer(bits)();

  const { keyBuffer, initParam } = parseKey(bits, key);
  if (initParam > 512) {
    wasm.writeMemory(keyBuffer!);
  }
  return wasm.calculate(data, initParam);
};

/**
 * Creates a new BLAKE2b hash instance
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8, between 8 and 512. Defaults to 512.
 * @param key Optional key (string, Buffer or TypedArray). Maximum length is 64 bytes.
 */
export const createBLAKE2b = async (bits = 512, key?: IDataType) => {
  return createBLAKE2bSync(bits, key, await getBLAKE2bPreparer(bits)());
};

/**
 * Creates a new BLAKE2b hash instance
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8, between 8 and 512. Defaults to 512.
 * @param key Optional key (string, Buffer or TypedArray). Maximum length is 64 bytes.
 */
export const createBLAKE2bSync = (
  bits = 512,
  key?: IDataType,
  wasm = getBLAKE2bPreparer(bits).wasm,
) => {
  const { keyBuffer, initParam } = parseKey(bits, key);
  const outputSize = bits / 8;

  if (initParam > 512) {
    wasm.writeMemory(keyBuffer!);
  }
  wasm.init(initParam);

  const obj: IHasher = {
    init:
      initParam > 512
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
    digest: (outputType) => wasm.digest(outputType) as any,
    save: () => wasm.save(),
    load: (data) => {
      wasm.load(data);
      return obj;
    },
    blockSize: 128,
    digestSize: outputSize,
  };
  return obj;
};
