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
    (outputType?: 'binary'): Uint8Array;
    (outputType?: any): Uint8Array;
    (outputType: 'hex'): string;
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

type $WasmCompile = {
  hash: Uint8Array;
  module: WebAssembly.Module;
  instance: WebAssembly.Instance;
};

const wasmCompileCache = new Map<
  string,
  Promise<$WasmCompile> | $WasmCompile
>();

// if (typeof WebAssembly === 'undefined') {
//   throw new Error('WebAssembly is not supported in this environment!');
// }
export const compileWasm = async (wasmName: $WASM_NAME) => {
  let wasmCompileTask = wasmCompileCache.get(wasmName);
  if (wasmCompileTask === undefined) {
    wasmCompileTask = wasmMutex.dispatch(() =>
      loadWasm(wasmName).then(async (wasm) => {
        const hash = new Uint8Array(wasm.sha1.slice(0, WASM_FUNC_HASH_LENGTH));
        const module = await WebAssembly.compile(wasm.data);
        const instance = await WebAssembly.instantiate(module, {});
        const wasmCompile = {
          hash,
          module,
          instance,
        };

        wasmCompileCache.set(wasmName, wasmCompile);
        return wasmCompile;
      }),
    );

    wasmCompileCache.set(wasmName, wasmCompileTask);
  }
  return await wasmCompileTask;
};

export const WASMInterfaceSync = <T extends object = object>(
  wasmCompile: $WasmCompile,
  wasmName: $WASM_NAME,
  hashLength: number,
) => {
  const { instance: wasmInstance, hash } = wasmCompile;
  const exports = wasmInstance.exports as unknown as $Exports & T;
  let memoryView = new Uint8Array(
    exports.memory.buffer,
    exports.Hash_GetBuffer(),
    MAX_HEAP,
  );
  let initialized = false;

  const getMemory = () => memoryView!;

  const writeMemory = (data: Uint8Array, offset = 0) => {
    getMemory().set(data, offset);
  };

  const setMemorySize = (totalSize: number) => {
    exports.Hash_SetMemorySize(totalSize);
    memoryView = new Uint8Array(
      exports.memory.buffer,
      exports.Hash_GetBuffer(),
      totalSize,
    );
  };

  const getStateSize = () => {
    const view = new DataView(exports.memory.buffer);
    const stateSize = view.getUint32(exports.STATE_SIZE, true);
    return stateSize;
  };

  const init = (bits?: number) => {
    initialized = true;
    exports.Hash_Init(bits);
  };

  const updateUInt8Array = (data: Uint8Array): void => {
    let read = 0;
    while (read < data.length) {
      const chunk = data.subarray(read, read + MAX_HEAP);
      read += chunk.length;
      getMemory().set(chunk);
      exports.Hash_Update(chunk.length);
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

  const digest = ((
    outputType: 'hex' | 'binary' = 'binary',
    padding?: number,
  ): Uint8Array | string => {
    if (!initialized) {
      throw new Error('digest() called before init()');
    }
    initialized = false;

    exports.Hash_Final(padding);

    if (outputType === 'hex') {
      return getDigestHex(digestChars, getMemory(), hashLength);
    }
    // the data is copied to allow GC of the original memory object
    return getMemory().slice(0, hashLength);
  }) as {
    (outputType?: 'binary', padding?: number): Uint8Array;
    (outputType?: any, padding?: number): Uint8Array;
    (outputType: 'hex', padding?: number): string;
  };

  const save = (): Uint8Array => {
    if (!initialized) {
      throw new Error(
        'save() can only be called after init() and before digest()',
      );
    }

    const stateOffset: number = exports.Hash_GetState();
    const stateLength: number = getStateSize();
    const memoryBuffer = exports.memory.buffer;
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
    exports.Hash_Calculate(buffer.length, initParam, digestParam);

    return getDigestHex(digestChars, getMemory(), hashLength);
  };

  return {
    getMemory,
    writeMemory,
    getExports: () => exports,
    setMemorySize,
    init,
    update,
    digest,
    save,
    load,
    calculate,
    hashLength,
  };
};

export const WASMInterface = async <T extends object = object>(
  wasmName: $WASM_NAME,
  hashLength: number,
) => {
  return WASMInterfaceSync<T>(
    await compileWasm(wasmName),
    wasmName,
    hashLength,
  );
};

export type $IWASMInterface<T extends object = object> = ReturnType<
  typeof WASMInterfaceSync
> & {
  getExports(): $Exports & T;
};

/**
 * @TODO 实现一个池子，如果 digest 了，那么就回收到池子中，可以重复使用
 */
export const createWasmPreparer = <T extends object = object>(
  wasmName: $WASM_NAME,
  hashLength: number,
) => {
  const preparer = () => {
    return WASMInterface<T>(wasmName, hashLength);
  };

  Object.defineProperties(preparer, {
    wasm: {
      get() {
        const wasmCompile = wasmCompileCache.get(wasmName);
        if (wasmCompile === undefined || wasmCompile instanceof Promise) {
          throw new Error(`wasm instance ${wasmName} is not yet ready.`);
        }
        return WASMInterfaceSync<T>(wasmCompile, wasmName, hashLength);
      },
    },
    prepare: {
      value: async () => {
        await compileWasm(wasmName);
      },
    },
  });

  return preparer as typeof preparer & {
    readonly wasm: $IWASMInterface;
    prepare(): Promise<void>;
  };
};

export type $WasmPreparer = ReturnType<typeof createWasmPreparer>;
