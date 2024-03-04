import { Buffer } from '../buffer.mjs';
import { createRIPEMD160Sync } from '../hash-wasm/ripemd160.mjs';
import { createSHA1Sync } from '../hash-wasm/sha1.mjs';
import { createSHA256Sync } from '../hash-wasm/sha256.mjs';

export function ripemd160(buffer: Buffer): Buffer {
  return Buffer.from(createRIPEMD160Sync().update(buffer).digest());
}

export function sha1(buffer: Buffer): Buffer {
  return Buffer.from(createSHA1Sync().update(buffer).digest());
}

export function sha256(buffer: Buffer): Buffer {
  return Buffer.from(createSHA256Sync().update(buffer).digest());
}

export function hash160(buffer: Buffer): Buffer {
  return ripemd160(sha256(buffer));
}

export function hash256(buffer: Buffer): Buffer {
  return sha256(sha256(buffer));
}

const TAGS = [
  'BIP0340/challenge',
  'BIP0340/aux',
  'BIP0340/nonce',
  'TapLeaf',
  'TapBranch',
  'TapSighash',
  'TapTweak',
  'KeyAgg list',
  'KeyAgg coefficient',
] as const;
export type TaggedHashPrefix = (typeof TAGS)[number];
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */
const TAGGED_HASH_PREFIXES = Object.fromEntries(
  TAGS.map((tag) => {
    const tagHash = sha256(Buffer.from(tag));
    return [tag, Buffer.concat([tagHash, tagHash])];
  }),
) as { [k in TaggedHashPrefix]: Buffer };

export function taggedHash(prefix: TaggedHashPrefix, data: Buffer): Buffer {
  return sha256(Buffer.concat([TAGGED_HASH_PREFIXES[prefix], data]));
}
