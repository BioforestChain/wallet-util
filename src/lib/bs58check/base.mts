'use strict';

import * as base58 from '../bs58.mjs';
import { Buffer } from '../buffer.mjs';

export const Bs58CheckFactory = (
  checksumFn: (buffer: Uint8Array) => Buffer,
) => {
  // Encode a buffer as a base58-check encoded string
  function encode(payload: Buffer) {
    var checksum = checksumFn(payload);

    return base58.encode(
      Buffer.concat([payload, checksum], payload.length + 4),
    );
  }

  function decodeRaw(buffer: Uint8Array) {
    var payload = buffer.slice(0, -4);
    var checksum = buffer.slice(-4);
    var newChecksum = checksumFn(payload);

    if (
      (checksum[0] ^ newChecksum[0]) |
      (checksum[1] ^ newChecksum[1]) |
      (checksum[2] ^ newChecksum[2]) |
      (checksum[3] ^ newChecksum[3])
    )
      return;

    return Buffer.from(payload);
  }

  // Decode a base58-check encoded string to a buffer, no result if checksum is wrong
  function decodeUnsafe(string: string) {
    var buffer = base58.decodeUnsafe(string);
    if (!buffer) return;

    return decodeRaw(buffer);
  }

  function decode(string: string) {
    var buffer = base58.decode(string);
    var payload = decodeRaw(buffer);
    if (!payload) throw new Error('Invalid checksum');
    return payload;
  }

  return {
    encode: encode,
    decode: decode,
    decodeUnsafe: decodeUnsafe,
  };
};
