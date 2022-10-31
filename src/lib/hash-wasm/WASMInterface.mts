import Mutex from './mutex.mjs';
import {
  equalsArray,
  getDigestHex,
  getUInt8Buffer,
  IDataType,
} from './util.mjs';
import { $WASM_NAME, loadWasm } from './wasm_loader.mjs';
export { $WASM_NAME };

export const MAX_HEAP = 16 * 1024;
const WASM_FUNC_HASH_LENGTH = 4;
const wasmMutex = new Mutex();

type ThenArg<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any[]) => Promise<infer V>
  ? V
  : T;

export type IHasher = {
  /**
   * Initializes hash state to default value
   */
  init: () => IHasher;
  /**
   * Updates the hash content with the given data
   */
  update: (data: IDataType) => IHasher;
  /**
   * Calculates the hash of all of the data passed to be hashed with hash.update().
   * Defaults to hexadecimal string
   * @param outputType If outputType is "binary", it returns Uint8Array. Otherwise it
   *                   returns hexadecimal string
   */
  digest: {
    (outputType: 'binary'): Uint8Array;
    (outputType?: 'hex'): string;
    (outputType?: any): string;
  };
  /**
   * Save the current internal state of the hasher for later resumption with load().
   * Cannot be called before .init() or after .digest()
   *
   * Note that this state can include arbitrary information about the value being hashed (e.g.
   * could include N plaintext bytes from the value), so needs to be treated as being as
   * sensitive as the input value itself.
   */
  save: () => Uint8Array;
  /**
   * Resume a state that was created by save(). If this state was not created by a
   * compatible build of hash-wasm, an exception will be thrown.
   */
  load: (state: Uint8Array) => IHasher;
  /**
   * Block size in bytes
   */
  blockSize: number;
  /**
   * Digest size in bytes
   */
  digestSize: number;
};

const wasmModuleCache = new Map<string, Promise<WebAssembly.Module>>();

export interface $Exports {
  Hash_SetMemorySize: (size: number) => void;
  Hash_GetBuffer: () => number;
  Hash_Init: (bits?: number) => void;
  Hash_Update: (size: number) => void;
  Hash_Final: (digestBytes?: number) => void;
  memory: WebAssembly.Memory;
  STATE_SIZE: number;
  Hash_GetState: () => number;
  Hash_Calculate: (
    length: number,
    initParam?: number,
    digestBytes?: number,
  ) => void;
}

export async function WASMInterface<T extends object = object>(
  wasmName: $WASM_NAME,
  hashLength: number,
) {
  let wasmInstance: WebAssembly.Instance | undefined;
  let memoryView: Uint8Array | undefined;
  let initialized = false;
  let hash: Uint8Array | undefined;

  if (typeof WebAssembly === 'undefined') {
    throw new Error('WebAssembly is not supported in this environment!');
  }
  const getMemory = () => memoryView!;
  const getExports = () => wasmInstance!.exports as unknown as $Exports & T;

  const writeMemory = (data: Uint8Array, offset = 0) => {
    getMemory().set(data, offset);
  };

  const setMemorySize = (totalSize: number) => {
    const exports = getExports();
    exports.Hash_SetMemorySize(totalSize);
    const arrayOffset: number = exports.Hash_GetBuffer();
    const memoryBuffer = exports.memory.buffer;
    memoryView = new Uint8Array(memoryBuffer, arrayOffset, totalSize);
  };

  const getStateSize = () => {
    const exports = getExports();
    const view = new DataView(exports.memory.buffer);
    const stateSize = view.getUint32(exports.STATE_SIZE, true);
    return stateSize;
  };

  const loadWASMPromise = wasmMutex.dispatch(async () => {
    let moduleTask = wasmModuleCache.get(wasmName);
    if (moduleTask === undefined) {
      moduleTask = loadWasm(wasmName).then((wasm) => {
        hash = new Uint8Array(wasm.sha1.slice(0, WASM_FUNC_HASH_LENGTH));
        return WebAssembly.compile(wasm.data);
      });

      wasmModuleCache.set(wasmName, moduleTask);
    }

    const module = await moduleTask;
    wasmInstance = await WebAssembly.instantiate(module, {
      // env: {
      //   emscripten_memcpy_big: (dest, src, num) => {
      //     const memoryBuffer = wasmInstance.exports.memory.buffer;
      //     const memView = new Uint8Array(memoryBuffer, 0);
      //     memView.set(memView.subarray(src, src + num), dest);
      //   },
      //   print_memory: (offset, len) => {
      //     const memoryBuffer = wasmInstance.exports.memory.buffer;
      //     const memView = new Uint8Array(memoryBuffer, 0);
      //     console.log('print_int32', memView.subarray(offset, offset + len));
      //   },
      // },
    });

    // wasmInstance.exports._start();
  });

  const setupInterface = async () => {
    if (!wasmInstance) {
      await loadWASMPromise;
    }
    const exports = getExports();

    const arrayOffset: number = exports.Hash_GetBuffer();
    const memoryBuffer = exports.memory.buffer;
    memoryView = new Uint8Array(memoryBuffer, arrayOffset, MAX_HEAP);
  };

  const init = (bits?: number) => {
    initialized = true;
    getExports().Hash_Init(bits);
  };

  const updateUInt8Array = (data: Uint8Array): void => {
    let read = 0;
    while (read < data.length) {
      const chunk = data.subarray(read, read + MAX_HEAP);
      read += chunk.length;
      getMemory().set(chunk);
      getExports().Hash_Update(chunk.length);
    }
  };

  const update = (data: IDataType) => {
    if (!initialized) {
      throw new Error('update() called before init()');
    }
    const Uint8Buffer = getUInt8Buffer(data);
    updateUInt8Array(Uint8Buffer);
  };

  const digestChars = new Uint8Array(hashLength * 2);

  const digest = (
    outputType: 'hex' | 'binary' = 'hex',
    padding?: number,
  ): Uint8Array | string => {
    if (!initialized) {
      throw new Error('digest() called before init()');
    }
    initialized = false;

    getExports().Hash_Final(padding);

    if (outputType === 'binary') {
      // the data is copied to allow GC of the original memory object
      return getMemory().slice(0, hashLength);
    }

    return getDigestHex(digestChars, getMemory(), hashLength);
  };

  const save = (): Uint8Array => {
    if (!initialized) {
      throw new Error(
        'save() can only be called after init() and before digest()',
      );
    }

    const stateOffset: number = getExports().Hash_GetState();
    const stateLength: number = getStateSize();
    const memoryBuffer = getExports().memory.buffer;
    const internalState = new Uint8Array(
      memoryBuffer,
      stateOffset,
      stateLength,
    );

    // prefix is 4 bytes from SHA1 hash of the WASM binary
    // it is used to detect incompatible internal states between different versions of hash-wasm
    const prefixedState = new Uint8Array(WASM_FUNC_HASH_LENGTH + stateLength);
    prefixedState.set(hash!, 0);
    prefixedState.set(internalState, WASM_FUNC_HASH_LENGTH);
    return prefixedState;
  };

  const load = (state: Uint8Array) => {
    if (!(state instanceof Uint8Array)) {
      throw new Error('load() expects an Uint8Array generated by save()');
    }
    const exports = getExports();

    const stateOffset: number = exports.Hash_GetState();
    const stateLength: number = getStateSize();
    const overallLength: number = WASM_FUNC_HASH_LENGTH + stateLength;
    const memoryBuffer = exports.memory.buffer;

    if (state.length !== overallLength) {
      throw new Error(
        `Bad state length (expected ${overallLength} bytes, got ${state.length})`,
      );
    }

    if (!equalsArray(hash!, state.subarray(0, WASM_FUNC_HASH_LENGTH))) {
      throw new Error(
        'This state was written by an incompatible hash implementation',
      );
    }

    const internalState = state.subarray(WASM_FUNC_HASH_LENGTH);
    new Uint8Array(memoryBuffer, stateOffset, stateLength).set(internalState);
    initialized = true;
  };

  const isDataShort = (data: IDataType) => {
    if (typeof data === 'string') {
      // worst case is 4 bytes / char
      return data.length < MAX_HEAP / 4;
    }

    return data.byteLength < MAX_HEAP;
  };

  let canSimplify: (data: IDataType, initParam?: number) => boolean =
    isDataShort;

  switch (wasmName) {
    case 'argon2':
    case 'scrypt':
      canSimplify = () => true;
      break;

    case 'blake2b':
    case 'blake2s':
      // if there is a key at blake2 then cannot simplify
      canSimplify = (data, initParam) =>
        typeof initParam === 'number' && initParam <= 512 && isDataShort(data);
      break;

    case 'blake3':
      // if there is a key at blake3 then cannot simplify
      canSimplify = (data, initParam) => initParam === 0 && isDataShort(data);
      break;

    case 'xxhash64': // cannot simplify
    case 'xxhash3':
    case 'xxhash128':
      canSimplify = () => false;
      break;

    default:
      break;
  }

  // shorthand for (init + update + digest) for better performance
  const calculate = (
    data: IDataType,
    initParam?: number,
    digestParam?: number,
  ): string => {
    if (!canSimplify(data, initParam)) {
      init(initParam);
      update(data);
      return digest('hex', digestParam) as string;
    }

    const buffer = getUInt8Buffer(data);
    getMemory().set(buffer);
    getExports().Hash_Calculate(buffer.length, initParam, digestParam);

    return getDigestHex(digestChars, getMemory(), hashLength);
  };

  await setupInterface();

  return {
    getMemory,
    writeMemory,
    getExports,
    setMemorySize,
    init,
    update,
    digest,
    save,
    load,
    calculate,
    hashLength,
  };
}

export type IWASMInterface = ThenArg<ReturnType<typeof WASMInterface>>;
