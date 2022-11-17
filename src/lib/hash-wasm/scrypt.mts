import { pbkdf2, pbkdf2Sync } from './pbkdf2.mjs';
import { createSHA256, createSHA256Sync, prepareSHA256 } from './sha256.mjs';
import { getDigestHex, IDataType } from './util.mjs';
import { createWasmPreparer, IHasher } from './WASMInterface.mjs';

/**
 * Load Scrypt wasm
 */
export const prepareScrypt = createWasmPreparer<$ScryptWasm>('scrypt', 0);

export interface $ScryptWasm {
  scrypt: (blockSize: number, costFactor: number, parallelism: number) => void;
}

export interface ScryptOptions {
  /**
   * Password (or message) to be hashed
   */
  password: IDataType;
  /**
   * Salt (usually containing random bytes)
   */
  salt: IDataType;
  /**
   * CPU / memory cost - must be a power of 2 (e.g. 1024)
   */
  costFactor: number;
  /**
   * Block size (8 is commonly used)
   */
  blockSize: number;
  /**
   * Degree of parallelism
   */
  parallelism: number;
  /**
   * Output size in bytes
   */
  hashLength: number;
  /**
   * Output data type. Defaults to hexadecimal string
   */
  outputType?: 'hex' | 'binary';
}

const scryptInternalSync = (
  options: ScryptOptions,
  hashFunction: IHasher,
  wasm = prepareScrypt.wasm,
) => {
  const { costFactor, blockSize, parallelism, hashLength } = options;

  const blockData = pbkdf2Sync({
    password: options.password,
    salt: options.salt,
    iterations: 1,
    hashLength: 128 * blockSize * parallelism,
    hashFunction: hashFunction,
    outputType: 'binary',
  });

  // last block is for storing the temporary vectors
  const VSize = 128 * blockSize * costFactor;
  const XYSize = 256 * blockSize;
  wasm.setMemorySize(blockData.length + VSize + XYSize);
  wasm.writeMemory(blockData, 0);

  // mix blocks
  wasm.getExports().scrypt(blockSize, costFactor, parallelism);

  const expensiveSalt = wasm
    .getMemory()
    .subarray(0, 128 * blockSize * parallelism);

  const outputData = pbkdf2Sync({
    password: options.password,
    salt: expensiveSalt,
    iterations: 1,
    hashLength,
    hashFunction: hashFunction,
    outputType: 'binary',
  });

  if (options.outputType === 'hex') {
    const digestChars = new Uint8Array(hashLength * 2);
    return getDigestHex(digestChars, outputData, hashLength);
  }

  // return binary format
  return outputData;
};

// eslint-disable-next-line no-bitwise
const isPowerOfTwo = (v: number): boolean => !!(v && !(v & (v - 1)));

const validateOptions = (options: ScryptOptions) => {
  if (!options || typeof options !== 'object') {
    throw new Error('Invalid options parameter. It requires an object.');
  }

  if (!Number.isInteger(options.blockSize) || options.blockSize < 1) {
    throw new Error('Block size should be a positive number');
  }

  if (
    !Number.isInteger(options.costFactor) ||
    options.costFactor < 2 ||
    !isPowerOfTwo(options.costFactor)
  ) {
    throw new Error('Cost factor should be a power of 2, greater than 1');
  }

  if (!Number.isInteger(options.parallelism) || options.parallelism < 1) {
    throw new Error('Parallelism should be a positive number');
  }

  if (!Number.isInteger(options.hashLength) || options.hashLength < 1) {
    throw new Error('Hash length should be a positive number.');
  }

  if (options.outputType === undefined) {
    options.outputType = 'hex';
  }

  if (!['hex', 'binary'].includes(options.outputType)) {
    throw new Error(
      `Insupported output type ${options.outputType}. Valid values: ['hex', 'binary']`,
    );
  }
};

interface IScryptOptionsBinary {
  outputType: 'binary';
}

type ScryptReturnType<T> = T extends {
  outputType: 'hex';
}
  ? string
  : Uint8Array;

/**
 * Calculates hash using the scrypt password-based key derivation function
 * @returns Computed hash as a hexadecimal string or as
 *          Uint8Array depending on the outputType option
 */
export const scrypt = async <T extends ScryptOptions>(options: T) => {
  validateOptions(options);

  return scryptInternalSync(
    options,
    await createSHA256(),
    await prepareScrypt(),
  ) as unknown as ScryptReturnType<T>;
};

/**
 * Calculates hash using the scrypt password-based key derivation function
 * @returns Computed hash as a hexadecimal string or as
 *          Uint8Array depending on the outputType option
 */
export const scryptSync = <T extends ScryptOptions>(options: T) => {
  validateOptions(options);

  return scryptInternalSync(
    options,
    createSHA256Sync(),
    prepareScrypt.wasm,
  ) as unknown as ScryptReturnType<T>;
};
