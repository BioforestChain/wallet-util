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

const blake2sPreparerCache = new Map<number, $WasmPreparer>();
/**
 * Load BLAKE2s wasm
 */
export const getBLAKE2sPreparer = (bits: number) => {
  validateBits(bits, 256);
  const hashLength = bits / 8;
  let preparer = blake2sPreparerCache.get(hashLength);
  if (preparer === undefined) {
    preparer = createWasmPreparer('blake2s', hashLength);
    blake2sPreparerCache.set(hashLength, preparer);
  }
  return preparer;
};

const parseKey = (bits: number, key?: IDataType) => {
  let keyBuffer: Uint8Array | undefined;
  let initParam = bits;
  if (key !== undefined) {
    keyBuffer = getUInt8Buffer(key);
    if (keyBuffer.length > 32) {
      throw new Error('Max key length is 32 bytes');
    }
    initParam = getInitParam(bits, keyBuffer.length);
  }
  return { keyBuffer, initParam };
};
/**
 * Calculates BLAKE2s hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8, between 8 and 256. Defaults to 256.
 * @param key Optional key (string, Buffer or TypedArray). Maximum length is 32 bytes.
 * @returns Computed hash as a hexadecimal string
 */
export const blake2s = async (data: IDataType, bits = 256, key?: IDataType) => {
  const wasm = await getBLAKE2sPreparer(bits)();
  const { keyBuffer, initParam } = parseKey(bits, key);

  if (initParam > 512) {
    wasm.writeMemory(keyBuffer!);
  }
  return wasm.calculate(data, initParam);
};

/**
 * Creates a new BLAKE2s hash instance
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8, between 8 and 256. Defaults to 256.
 * @param key Optional key (string, Buffer or TypedArray). Maximum length is 32 bytes.
 */
export const createBLAKE2s = async (bits = 256, key?: IDataType) => {
  return createBLAKE2sSync(bits, key, await getBLAKE2sPreparer(bits)());
};

/**
 * Creates a new BLAKE2s hash instance
 * @param bits Number of output bits, which has to be a number
 *             divisible by 8, between 8 and 256. Defaults to 256.
 * @param key Optional key (string, Buffer or TypedArray). Maximum length is 32 bytes.
 */
export const createBLAKE2sSync = (
  bits = 256,
  key?: IDataType,
  wasm = getBLAKE2sPreparer(bits).wasm,
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
    blockSize: 64,
    digestSize: outputSize,
  };
  return obj;
};
