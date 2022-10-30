'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const RipeMd160 = require('../ripemd160/index.cjs');
const createHash = require('../create-hash/index.cjs');
const createHmac = require('../create-hmac/index.cjs');
function hash160(buffer) {
  const sha256Hash = createHash('sha256').update(buffer).digest();
  try {
    return createHash('rmd160').update(sha256Hash).digest();
  } catch (err) {
    try {
      return createHash('ripemd160').update(sha256Hash).digest();
    } catch (err2) {
      return new RipeMd160().update(sha256Hash).digest();
    }
  }
}
exports.hash160 = hash160;
function hmacSHA512(key, data) {
  return createHmac('sha512', key).update(data).digest();
}
exports.hmacSHA512 = hmacSHA512;
