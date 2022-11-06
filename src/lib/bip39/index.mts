// import * as createHash from 'create-hash';
// import { pbkdf2, pbkdf2Sync } from 'pbkdf2';
import { pbkdf2, pbkdf2Sync, sha256 } from './crypto.mjs';
import { randomBytes } from '../crypto.mjs';
import { Buffer } from '../buffer.mjs';
import { getDefaultWordlist } from './wordlists.mjs';

const INVALID_MNEMONIC = 'Invalid mnemonic';
const INVALID_ENTROPY = 'Invalid entropy';
const INVALID_CHECKSUM = 'Invalid mnemonic checksum';
const WORDLIST_REQUIRED =
  'A wordlist is required but a default could not be found.\n' +
  'Please pass a 2048 word array explicitly.';

export function normalize(str?: string): string {
  return (str || '').normalize('NFKD');
}

function binaryToByte(bin: string): number {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes: ArrayLike<number>): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    binary += byte.toString(2).padStart(8, '0');
  }
  return binary;
}

function deriveChecksumBits(entropyBuffer: Buffer): string {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = sha256(entropyBuffer);

  return bytesToBinary(hash).slice(0, CS);
}

function salt(password?: string): string {
  return 'mnemonic' + (password || '');
}

export function mnemonicToSeedSync(
  mnemonic: string,
  password?: string,
): Buffer {
  const mnemonicBuffer = Buffer.from(normalize(mnemonic), 'utf8');
  const saltBuffer = Buffer.from(salt(normalize(password)), 'utf8');

  return pbkdf2Sync(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512');
}

export function mnemonicToSeed(
  mnemonic: string,
  password?: string,
): Promise<Buffer> {
  const mnemonicBuffer = Buffer.from(normalize(mnemonic), 'utf8');
  const saltBuffer = Buffer.from(salt(normalize(password)), 'utf8');
  return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512');
}

export function mnemonicToEntropy(
  mnemonic: string,
  wordlist?: string[],
): string {
  wordlist = wordlist || getDefaultWordlist()?.wordlist;
  if (!wordlist) {
    throw new Error(WORDLIST_REQUIRED);
  }

  const words = normalize(mnemonic).split(' ');
  if (words.length % 3 !== 0) {
    throw new Error(INVALID_MNEMONIC);
  }

  // convert word indices to 11 bit binary strings
  const bits = words
    .map((word: string): string => {
      const index = wordlist!.indexOf(word);
      if (index === -1) {
        throw new Error(INVALID_MNEMONIC);
      }

      return index.toString(2).padStart(11, '0');
    })
    .join('');

  // split the binary string into ENT/CS
  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);

  // calculate the checksum and compare
  const entropyBytes = entropyBits.match(/(.{1,8})/g)!.map(binaryToByte);
  if (entropyBytes.length < 16) {
    throw new Error(INVALID_ENTROPY);
  }
  if (entropyBytes.length > 32) {
    throw new Error(INVALID_ENTROPY);
  }
  if (entropyBytes.length % 4 !== 0) {
    throw new Error(INVALID_ENTROPY);
  }

  const entropy = Buffer.from(entropyBytes);
  const newChecksum = deriveChecksumBits(entropy);
  if (newChecksum !== checksumBits) {
    throw new Error(INVALID_CHECKSUM);
  }

  return entropy.toString('hex');
}

export function entropyToMnemonic(
  entropy: Buffer | string,
  wordlist?: string[],
): string {
  if (!Buffer.isBuffer(entropy)) {
    entropy = Buffer.from(entropy, 'hex');
  }
  wordlist = wordlist || getDefaultWordlist()?.wordlist;
  if (!wordlist) {
    throw new Error(WORDLIST_REQUIRED);
  }

  // 128 <= ENT <= 256
  if (entropy.length < 16) {
    throw new TypeError(INVALID_ENTROPY);
  }
  if (entropy.length > 32) {
    throw new TypeError(INVALID_ENTROPY);
  }
  if (entropy.length % 4 !== 0) {
    throw new TypeError(INVALID_ENTROPY);
  }

  const entropyBits = bytesToBinary(Array.from(entropy));
  const checksumBits = deriveChecksumBits(entropy);

  const bits = entropyBits + checksumBits;
  const chunks = bits.match(/(.{1,11})/g)!;
  const words = chunks.map((binary: string): string => {
    const index = binaryToByte(binary);
    return wordlist![index];
  });

  return wordlist[0] === '\u3042\u3044\u3053\u304f\u3057\u3093' // Japanese wordlist
    ? words.join('\u3000')
    : words.join(' ');
}

export function generateMnemonic(
  strength?: number,
  rng = randomBytes,
  wordlist?: string[],
): string {
  strength = strength || 128;
  if (strength % 32 !== 0) {
    throw new TypeError(INVALID_ENTROPY);
  }

  return entropyToMnemonic(Buffer.from(rng(strength / 8)), wordlist);
}

export function validateMnemonic(
  mnemonic: string,
  wordlist?: string[],
): boolean {
  try {
    mnemonicToEntropy(mnemonic, wordlist);
  } catch (e) {
    return false;
  }

  return true;
}
