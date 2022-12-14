import { Buffer } from '../buffer.mjs';
import { bs58check } from '../bs58check/index.mjs';

export function decodeRaw(buffer: Buffer, version?: number) {
  // check version only if defined
  if (version !== undefined && buffer[0] !== version)
    throw new Error('Invalid network version');

  // uncompressed
  if (buffer.length === 33) {
    return {
      version: buffer[0],
      privateKey: buffer.slice(1, 33),
      compressed: false,
    };
  }

  // invalid length
  if (buffer.length !== 34) throw new Error('Invalid WIF length');

  // invalid compression flag
  if (buffer[33] !== 0x01) throw new Error('Invalid compression flag');

  return {
    version: buffer[0],
    privateKey: buffer.slice(1, 33),
    compressed: true,
  };
}

export function encodeRaw(
  version: number,
  privateKey: Buffer,
  compressed: boolean,
) {
  var result = Buffer.alloc(compressed ? 34 : 33);

  result.writeUInt8(version, 0);
  privateKey.copy(result, 1);

  if (compressed) {
    result[33] = 0x01;
  }

  return result;
}

export function decode(string: string, version?: number) {
  return decodeRaw(bs58check.decode(string), version);
}

export function encode(
  version: number,
  privateKey: Buffer,
  compressed: boolean,
) {
  //   if (typeof version !== 'number')
  //   return bs58check.encode(
  //     encodeRaw(version.version, version.privateKey, version.compressed),
  //   );
  return bs58check.encode(encodeRaw(version, privateKey, compressed));
}
