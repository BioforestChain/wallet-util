import { Buffer } from '../buffer.mjs';
import { createSHA512Sync } from '../hash-wasm/sha512.mjs';
import { createHMACSync } from '../hash-wasm/hmac.mjs';
export { hash160 } from '../bitcoin-lib/crypto.mjs';

// const ZEROS = Buffer.alloc(128);

export function hmacSHA512(key: Buffer, data: Buffer): Buffer {
  return Buffer.from(
    createHMACSync(createSHA512Sync(), key).update(data).digest(),
  );
  // const alg = 'sha512';
  // const blocksize = alg === 'sha512' || alg === 'sha384' ? 128 : 64;

  // if (key.length > blocksize) {
  //   key = Buffer.from(createSHA512Sync().update(key).digest());
  // } else if (key.length < blocksize) {
  //   key = Buffer.concat([key, ZEROS], blocksize);
  // }

  // const ipad = Buffer.allocUnsafe(blocksize);
  // const opad = Buffer.allocUnsafe(blocksize);
  // for (var i = 0; i < blocksize; i++) {
  //   ipad[i] = key[i] ^ 0x36;
  //   opad[i] = key[i] ^ 0x5c;
  // }
  // const hash = createSHA512Sync().update(ipad);

  // /// update
  // hash.update(data);

  // /// final
  // const hmac = createSHA512Sync().update(opad).update(hash.digest()).digest();

  // return Buffer.from(hmac);
}
