import { Buffer } from '../buffer.mjs';

import { prepareSHA256, createSHA256Sync } from '../hash-wasm/sha256.mjs';

export const prepareCrypto = async () => {
  await prepareSHA256.prepare();
};

export function sha256(buffer: Uint8Array): Buffer {
  return Buffer.from(createSHA256Sync().update(buffer).digest());
}

export function sha256x2(buffer: Uint8Array): Buffer {
  return sha256(sha256(buffer));
}
