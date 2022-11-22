import { IHasher } from 'src/lib/hash-wasm/WASMInterface.mjs';
import { pbkdf2Sync as _pbkdf2Sync } from '../../hash-wasm/pbkdf2.mjs';
import { createSHA256Sync } from '../../hash-wasm/sha256.mjs';
import { createSHA512Sync } from '../../hash-wasm/sha512.mjs';
import { Buffer } from '../../buffer.mjs';
export function pbkdf2(
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
  hashAlgorithm: string,
): string {
  let hashFunction: IHasher;
  if (hashAlgorithm === 'sha256') {
    hashFunction = createSHA256Sync();
  } else if (hashAlgorithm === 'sha512') {
    hashFunction = createSHA512Sync();
  } else {
    throw new Error(`no support hash algorithm: ${hashAlgorithm}`);
  }
  return (
    '0x' +
    Buffer.from(
      _pbkdf2Sync({
        password,
        salt,
        iterations,
        hashLength: keylen,
        hashFunction,
      }),
    ).toString('hex')
  );
}
