/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */

import lockedCreate from './lockedCreate.mjs';
import Mutex from './mutex.mjs';
import { $WASM_NAME, $IWASMInterface } from './WASMInterface.mjs';

function getGlobal() {
  // eslint-disable-next-line no-undef
  if (typeof globalThis !== 'undefined') return globalThis;
  // eslint-disable-next-line no-restricted-globals, no-undef
  if (typeof self !== 'undefined') return self;
  // eslint-disable-next-line no-undef
  if (typeof window !== 'undefined') return window;
  return global;
}

const globalObject = getGlobal();
const nodeBuffer = globalObject.Buffer ?? null;
const textEncoder = globalObject.TextEncoder
  ? new globalObject.TextEncoder()
  : null;

export type ITypedArray = Uint8Array | Uint16Array | Uint32Array;
export type IDataType = string | Buffer | ITypedArray;

export function intArrayToString(arr: Uint8Array, len: number): string {
  return String.fromCharCode(...arr.subarray(0, len));
}

function hexCharCodesToInt(a: number, b: number): number {
  return (
    (((a & 0xf) + ((a >> 6) | ((a >> 3) & 0x8))) << 4) |
    ((b & 0xf) + ((b >> 6) | ((b >> 3) & 0x8)))
  );
}

export function writeHexToUInt8(buf: Uint8Array, str: string) {
  const size = str.length >> 1;
  for (let i = 0; i < size; i++) {
    const index = i << 1;
    buf[i] = hexCharCodesToInt(
      str.charCodeAt(index),
      str.charCodeAt(index + 1),
    );
  }
}

export function hexStringEqualsUInt8(str: string, buf: Uint8Array): boolean {
  if (str.length !== buf.length * 2) {
    return false;
  }
  for (let i = 0; i < buf.length; i++) {
    const strIndex = i << 1;
    if (
      buf[i] !==
      hexCharCodesToInt(str.charCodeAt(strIndex), str.charCodeAt(strIndex + 1))
    ) {
      return false;
    }
  }
  return true;
}

export function equalsArray<T extends ArrayLike<number>>(a1: T, a2: T) {
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; i++) {
    const strIndex = i << 1;
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

const alpha = 'a'.charCodeAt(0) - 10;
const digit = '0'.charCodeAt(0);
export function getDigestHex(
  tmpBuffer: Uint8Array,
  input: Uint8Array,
  hashLength: number,
): string {
  let p = 0;
  /* eslint-disable no-plusplus */
  for (let i = 0; i < hashLength; i++) {
    let nibble = input[i] >>> 4;
    tmpBuffer[p++] = nibble > 9 ? nibble + alpha : nibble + digit;
    nibble = input[i] & 0xf;
    tmpBuffer[p++] = nibble > 9 ? nibble + alpha : nibble + digit;
  }
  /* eslint-enable no-plusplus */

  return String.fromCharCode.apply(null, tmpBuffer as unknown as Array<number>);
}

export const getUInt8Buffer =
  nodeBuffer !== null
    ? (data: IDataType): Uint8Array => {
        if (typeof data === 'string') {
          const buf = nodeBuffer.from(data, 'utf8');
          return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
        }

        if (nodeBuffer.isBuffer(data)) {
          return new Uint8Array(data.buffer, data.byteOffset, data.length);
        }

        if (ArrayBuffer.isView(data)) {
          return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }

        throw new Error('Invalid data type!');
      }
    : (data: IDataType): Uint8Array => {
        if (typeof data === 'string') {
          return textEncoder!.encode(data);
        }

        if (ArrayBuffer.isView(data)) {
          return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }

        throw new Error('Invalid data type!');
      };

const base64Chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64Lookup = new Uint8Array(256);
for (let i = 0; i < base64Chars.length; i++) {
  base64Lookup[base64Chars.charCodeAt(i)] = i;
}

export function encodeBase64(data: Uint8Array, pad = true): string {
  const len = data.length;
  const extraBytes = len % 3;
  const parts = [];

  const len2 = len - extraBytes;
  for (let i = 0; i < len2; i += 3) {
    const tmp =
      ((data[i] << 16) & 0xff0000) +
      ((data[i + 1] << 8) & 0xff00) +
      (data[i + 2] & 0xff);

    const triplet =
      base64Chars.charAt((tmp >> 18) & 0x3f) +
      base64Chars.charAt((tmp >> 12) & 0x3f) +
      base64Chars.charAt((tmp >> 6) & 0x3f) +
      base64Chars.charAt(tmp & 0x3f);

    parts.push(triplet);
  }

  if (extraBytes === 1) {
    const tmp = data[len - 1];
    const a = base64Chars.charAt(tmp >> 2);
    const b = base64Chars.charAt((tmp << 4) & 0x3f);

    parts.push(`${a}${b}`);
    if (pad) {
      parts.push('==');
    }
  } else if (extraBytes === 2) {
    const tmp = (data[len - 2] << 8) + data[len - 1];
    const a = base64Chars.charAt(tmp >> 10);
    const b = base64Chars.charAt((tmp >> 4) & 0x3f);
    const c = base64Chars.charAt((tmp << 2) & 0x3f);
    parts.push(`${a}${b}${c}`);
    if (pad) {
      parts.push('=');
    }
  }

  return parts.join('');
}

export function getDecodeBase64Length(data: string): number {
  let bufferLength = Math.floor(data.length * 0.75);
  const len = data.length;

  if (data[len - 1] === '=') {
    bufferLength -= 1;
    if (data[len - 2] === '=') {
      bufferLength -= 1;
    }
  }

  return bufferLength;
}

export function decodeBase64(data: string): Uint8Array {
  const bufferLength = getDecodeBase64Length(data);
  const len = data.length;

  const bytes = new Uint8Array(bufferLength);

  let p = 0;
  for (let i = 0; i < len; i += 4) {
    const encoded1 = base64Lookup[data.charCodeAt(i)];
    const encoded2 = base64Lookup[data.charCodeAt(i + 1)];
    const encoded3 = base64Lookup[data.charCodeAt(i + 2)];
    const encoded4 = base64Lookup[data.charCodeAt(i + 3)];

    bytes[p] = (encoded1 << 2) | (encoded2 >> 4);
    p += 1;
    bytes[p] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    p += 1;
    bytes[p] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    p += 1;
  }

  return bytes;
}
export function validateBits(bits: number, max: number) {
  if (!Number.isInteger(bits) || bits < 8 || bits > max || bits % 8 !== 0) {
    throw `Invalid variant! Valid values: 8, 16, ..., ${max}`;
  }
}

export function getInitParam(outputBits: number, keyBits: number) {
  // eslint-disable-next-line no-bitwise
  return outputBits | (keyBits << 16);
}

const _invalidateSeed = (seed: number) =>
  !Number.isInteger(seed) || seed < 0 || seed > 0xffffffff;

export const validateSeed = (seed: number) => {
  if (_invalidateSeed(seed)) {
    throw new Error('Seed must be a valid 32-bit long unsigned integer.');
  }
};

export const validateLowHeightSeed = (seedLow: number, seedHigh: number) => {
  if (_invalidateSeed(seedLow) || _invalidateSeed(seedHigh)) {
    throw new Error(
      'Seed must be given as two valid 32-bit long unsigned integers (lo + high).',
    );
  }
};
