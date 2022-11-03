import * as crypto from '../hash-wasm/pbkdf2.mjs';
import { createSHA256Sync } from '../hash-wasm/sha256.mjs';
import { createSHA512, createSHA512Sync } from '../hash-wasm/sha512.mjs';
import type { IDataType } from '../hash-wasm/util.mjs';
import { Buffer } from '../buffer.mjs';

export const pbkdf2Sync = (
  password: IDataType,
  salt: IDataType,
  iterations: number,
  hashLength: number,
  _hash: 'sha512',
) => {
  const buf = crypto.pbkdf2Sync({
    hashFunction: createSHA512Sync(),
    password,
    salt,
    iterations,
    hashLength,
    digest: 'binary',
  });
  return Buffer.from(buf);
};

export const pbkdf2 = async (
  password: IDataType,
  salt: IDataType,
  iterations: number,
  hashLength: number,
  _hash: 'sha512',
) => {
  const buf = await crypto.pbkdf2({
    hashFunction: createSHA512(),
    password,
    salt,
    iterations,
    hashLength,
    digest: 'binary',
  });
  return Buffer.from(buf);
};

export const sha256 = (data: IDataType) => {
  return createSHA256Sync().update(data).digest();
};
