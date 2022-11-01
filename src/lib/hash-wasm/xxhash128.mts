import { IDataType, validateLowHeightSeed } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load xxHash128 wasm
 */
export const prepareXXHash128 = createWasmPreparer('xxhash128', 4);

const seedBuffer = new ArrayBuffer(8);
const seedArray = new Uint8Array(seedBuffer);
const seedView = new DataView(seedBuffer);

function writeSeed(low: number, high: number) {
  // write in little-endian format
  seedView.setUint32(0, low, true);
  seedView.setUint32(4, high, true);
}

/**
 * Calculates xxHash128 hash
 * @param data Input data (string, Buffer or TypedArray)
 * @param seedLow Lower 32 bits of the number used to
 *  initialize the internal state of the algorithm (defaults to 0)
 * @param seedHigh Higher 32 bits of the number used to
 *  initialize the internal state of the algorithm (defaults to 0)
 * @returns Computed hash as a hexadecimal string
 */
export const xxhash128 = async (data: IDataType, seedLow = 0, seedHigh = 0) => {
  validateLowHeightSeed(seedLow, seedHigh);

  writeSeed(seedLow, seedHigh);
  const wasm = await prepareXXHash128();
  wasm.writeMemory(seedArray);
  return wasm.calculate(data);
};

/**
 * Creates a new xxHash128 hash instance
 * @param seedLow Lower 32 bits of the number used to
 *  initialize the internal state of the algorithm (defaults to 0)
 * @param seedHigh Higher 32 bits of the number used to
 *  initialize the internal state of the algorithm (defaults to 0)
 */
export const createXXHash128 = async (seedLow = 0, seedHigh = 0) => {
  return createXXHash128Sync(seedLow, seedHigh, await prepareXXHash128());
};

/**
 * Creates a new xxHash128 hash instance
 * @param seedLow Lower 32 bits of the number used to
 *  initialize the internal state of the algorithm (defaults to 0)
 * @param seedHigh Higher 32 bits of the number used to
 *  initialize the internal state of the algorithm (defaults to 0)
 */
export const createXXHash128Sync = (
  seedLow = 0,
  seedHigh = 0,
  wasm = prepareXXHash128.wasm,
) => {
  validateLowHeightSeed(seedLow, seedHigh);

  writeSeed(seedLow, seedHigh);
  const seedArray = new Uint8Array(seedBuffer);
  wasm.writeMemory(seedArray);
  wasm.init();
  const obj: IHasher = {
    init: () => {
      wasm.writeMemory(seedArray);
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
    blockSize: 512,
    digestSize: 16,
  };
  return obj;
};
