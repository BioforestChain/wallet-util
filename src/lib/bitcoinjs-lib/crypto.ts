// import * as createHash from '../../../assets/create-hash/index.cjs';
import { createRIPEMD160 } from '../hash-wasm/ripemd160.mjs';
import { createSHA1 } from '../hash-wasm/sha1.mjs';
import { createSHA256 } from '../hash-wasm/sha256.mjs';
import type { IDataType } from '../hash-wasm/util.mjs';
import { cacheCall } from '../utils.mjs';
import { Buffer } from '../buffer.mjs';

export async function ripemd160(buffer: IDataType) {
  return Buffer.from((await createRIPEMD160()).update(buffer).digest('binary'));
}

export async function sha1(buffer: IDataType) {
  return Buffer.from((await createSHA1()).update(buffer).digest('binary'));
}

export async function sha256(buffer: IDataType) {
  return Buffer.from((await createSHA256()).update(buffer).digest('binary'));
}

export async function hash160(buffer: Buffer) {
  return Buffer.from(await ripemd160(await sha256(buffer)));
}

export async function hash256(buffer: Buffer) {
  return Buffer.from(await sha256(await sha256(buffer)));
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
export type TaggedHashPrefix = typeof TAGS[number];
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */
const TAGGED_HASH_PREFIXES = Object.fromEntries(
  TAGS.map((tag) => {
    return [
      tag,
      cacheCall(async () => {
        const tagHash = await sha256(Buffer.from(tag));
        return Buffer.concat([tagHash, tagHash]);
      }),
    ];
  }),
) as { [k in TaggedHashPrefix]: () => Promise<Buffer> };

export async function taggedHash(prefix: TaggedHashPrefix, data: Buffer) {
  return sha256(Buffer.concat([await TAGGED_HASH_PREFIXES[prefix](), data]));
}
