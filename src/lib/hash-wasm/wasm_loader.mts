import { config } from '../assetLoader.mjs';

export async function loadWasm(wasmName: $WASM_NAME) {
  const wasmUrl = `${config.wasmBaseUrl}/hash-wasm/${wasmName}.wasm`;
  const data = await config.wasmLoader(wasmUrl);
  const sha1 = await crypto.subtle.digest('SHA-1', data);
  return { data, sha1 };
}
export type $WASM_NAME =
  | 'adler32'
  | 'argon2'
  | 'bcrypt'
  | 'blake2b'
  | 'blake2s'
  | 'blake3'
  | 'crc32'
  | 'md4'
  | 'md5'
  | 'ripemd160'
  | 'scrypt'
  | 'sha1'
  | 'sha256'
  | 'sha3'
  | 'sha512'
  | 'sm3'
  | 'whirlpool'
  | 'xxhash128'
  | 'xxhash3'
  | 'xxhash32'
  | 'xxhash64';
