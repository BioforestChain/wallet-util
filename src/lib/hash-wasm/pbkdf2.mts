/* eslint-disable no-bitwise */
import { createHMAC, createHMACSync } from './hmac.mjs';
import { getDigestHex, getUInt8Buffer, IDataType } from './util.mjs';
import { IHasher } from './WASMInterface.mjs';

interface IPBKDF2BaseOptions {
  /**
   * Password (or message) to be hashed
   */
  password: IDataType;
  /**
   * Salt (usually containing random bytes)
   */
  salt: IDataType;
  /**
   * Number of iterations to perform
   */
  iterations: number;
  /**
   * Output size in bytes
   */
  hashLength: number;
  /**
   * Desired output type. Defaults to 'hex'
   */
  outputType?: 'hex' | 'binary';
}

export interface IPBKDF2AsyncOptions extends IPBKDF2BaseOptions {
  /**
   * Hash algorithm to use. It has to be the return value of a function like createSHA1()
   */
  hashFunction: Promise<IHasher>;
}
export interface IPBKDF2SyncOptions extends IPBKDF2BaseOptions {
  /**
   * Hash algorithm to use. It has to be the return value of a function like createSHA1()
   */
  hashFunction: IHasher;
}

function calculatePBKDF2(
  digest: IHasher,
  salt: IDataType,
  iterations: number,
  hashLength: number,
  outputType?: 'hex' | 'binary',
): Uint8Array | string {
  const DK = new Uint8Array(hashLength);
  const block1 = new Uint8Array(salt.length + 4);
  const block1View = new DataView(block1.buffer);
  const saltBuffer = getUInt8Buffer(salt);
  const saltUIntBuffer = new Uint8Array(
    saltBuffer.buffer,
    saltBuffer.byteOffset,
    saltBuffer.length,
  );
  block1.set(saltUIntBuffer);

  let destPos = 0;
  const hLen = digest.digestSize;
  const l = Math.ceil(hashLength / hLen);

  let T: Uint8Array | undefined;
  let U: Uint8Array | undefined;

  for (let i = 1; i <= l; i++) {
    block1View.setUint32(salt.length, i);

    digest.init();
    digest.update(block1);
    T = digest.digest('binary');
    U = T.slice();

    for (let j = 1; j < iterations; j++) {
      digest.init();
      digest.update(U);
      U = digest.digest('binary');
      for (let k = 0; k < hLen; k++) {
        T[k] ^= U[k];
      }
    }

    DK.set(T.subarray(0, hashLength - destPos), destPos);
    destPos += hLen;
  }

  if (outputType === 'hex') {
    const digestChars = new Uint8Array(hashLength * 2);
    return getDigestHex(digestChars, DK, hashLength);
  }
  return DK;
}

const validateBaseOptions = (options: IPBKDF2BaseOptions) => {
  if (!options || typeof options !== 'object') {
    throw new Error('Invalid options parameter. It requires an object.');
  }

  if (!Number.isInteger(options.iterations) || options.iterations < 1) {
    throw new Error('Iterations should be a positive number');
  }

  if (!Number.isInteger(options.hashLength) || options.hashLength < 1) {
    throw new Error('Hash length should be a positive number');
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

type PBKDF2ReturnType<T> = T extends {
  outputType: 'hex';
}
  ? string
  : Uint8Array;

/**
 * Generates a new PBKDF2 hash for the supplied password
 */
export async function pbkdf2<T extends IPBKDF2AsyncOptions>(
  options: T,
): Promise<PBKDF2ReturnType<T>> {
  const hashFunction = await options.hashFunction;
  if (!hashFunction) {
    throw new Error(
      'Invalid hash function is provided! Usage: pbkdf2("password", "salt", 1000, 32, createSHA1()).',
    );
  }

  return pbkdf2Sync({
    ...options,
    hashFunction,
  });
}

export const pbkdf2Sync = <T extends IPBKDF2SyncOptions>(options: T) => {
  if (!options.hashFunction) {
    throw new Error(
      'Invalid hash function is provided! Usage: pbkdf2Sync("password", "salt", 1000, 32, createSHA1Sync()).',
    );
  }
  validateBaseOptions(options);

  const hmac = createHMACSync(options.hashFunction, options.password);
  return calculatePBKDF2(
    hmac,
    options.salt,
    options.iterations,
    options.hashLength,
    options.outputType,
  ) as PBKDF2ReturnType<T>;
};
