'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.taggedHash = exports.hash256 = exports.hash160 = exports.sha256 = exports.sha1 = exports.ripemd160 = void 0;
const createHash = require('../create-hash/index.js');
const RipeMd160 = require('../ripemd160/index.js');
function ripemd160(buffer) {
  try {
    return createHash('rmd160')
      //@ts-ignore
      .update(buffer)
      .digest();
  } catch (err) {
    try {
      return createHash('ripemd160')
        //@ts-ignore
        .update(buffer)
        .digest();
    } catch (err2) {
      //@ts-ignore
      return new RipeMd160().update(buffer).digest();
    }
  }
}
exports.ripemd160 = ripemd160;
function sha1(buffer) {
  return createHash('sha1')
    //@ts-ignore
    .update(buffer)
    .digest();
}
exports.sha1 = sha1;
function sha256(buffer) {
  return createHash('sha256')
    //@ts-ignore
    .update(buffer)
    .digest();
}
exports.sha256 = sha256;
function hash160(buffer) {
  return ripemd160(sha256(buffer));
}
exports.hash160 = hash160;
function hash256(buffer) {
  return sha256(sha256(buffer));
}
exports.hash256 = hash256;
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
];
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */
const TAGGED_HASH_PREFIXES = Object.fromEntries(
  TAGS.map(tag => {
    //@ts-ignore
    const tagHash = sha256(Buffer.from(tag));
    //@ts-ignore
    return [tag, Buffer.concat([tagHash, tagHash])];
  }),
);
function taggedHash(prefix, data) {
  //@ts-ignore
  return sha256(Buffer.concat([TAGGED_HASH_PREFIXES[prefix], data]));
}
exports.taggedHash = taggedHash;
