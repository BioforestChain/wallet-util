const crypto = globalThis.crypto;
const subtle = crypto?.subtle;

function utf8ToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export type $Input = Uint8Array | string;
export function toBytes(data: $Input): Uint8Array {
  if (typeof data === 'string') data = utf8ToBytes(data);
  return data;
}

export async function sha(
  algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512',
  input: $Input
) {
  const arrayBuffer = await subtle.digest(algorithm, toBytes(input));
  return new Uint8Array(arrayBuffer);
}

export async function pbkdf2(
  hashAlgorithm: 'SHA-1' | 'SHA-256' | 'SHA-512',
  password: $Input,
  salt: $Input,
  iterations: number,
  byteLength: number
): Promise<Uint8Array> {
  const baseKey = await subtle.importKey(
    'raw',
    toBytes(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const arrayBuffer = await subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: hashAlgorithm,
      salt: toBytes(salt),
      iterations,
    },
    baseKey,
    byteLength * 8
  );
  return new Uint8Array(arrayBuffer);
}

import rand_cjs from '../../assets/tiny-crypto/rand/index.cjs';
export const randomBytes = rand_cjs.randomBytes;
