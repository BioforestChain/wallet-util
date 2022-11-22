import { createResolveTo } from './resolveTo.mjs';
import fs from 'node:fs';
import path from 'node:path';

// @ts-check
const resolveTo = createResolveTo(import.meta.url);
/**
 *
 * @param {string} packageName
 * @param {string} fromDir
 * @returns
 */
const listPackage = (packageName, fromDir) => {
  if (fs.existsSync(fromDir) === false) {
    return [];
  }
  return fs.readdirSync(fromDir).map((name) => {
    const basename = name.replace('.mts', '');

    return [
      basename === 'index' ? packageName : `${packageName}/${basename}`,
      path.normalize(`${fromDir}/${basename}.mjs`),
    ];
  });
};
/**
 * 已知的包对应的替代
 */
export const ALERTNATIVE_LIBS = new Map([
  ['tiny-secp256k1', resolveTo('../src/lib/tiny-secp256k1/index.mjs')],
  ['events', resolveTo('../src/lib/events.mjs')],
  ['cross-fetch', resolveTo('../src/lib/cross-fetch.mjs')],
  ['net', resolveTo('../src/lib/net.mjs')],
  ['buffer', resolveTo('../src/lib/buffer.mjs')],
  ['crypto', resolveTo('../src/lib/crypto.mjs')],
  ['crc-32', resolveTo('../src/lib/crc-32/index.mjs')],
  ['bn.js', resolveTo('../src/lib/bn.mjs')],
  ['bech32', resolveTo('../src/lib/bech32.mjs')],
  ['hash-wasm', resolveTo('../src/lib/hash-wasm/index.mjs')],
  // ...listPackage('@noble/hashes', resolveTo('../src/lib/_moke-@noble__hashes')),
  // ...listPackage(
  //   '@noble/secp256k1',
  //   resolveTo('../src/lib/_moke-@noble__secp256k1'),
  // ),
  // ...listPackage(
  //   'ethereum-cryptography',
  //   resolveTo('../src/lib/_moke-ethereum-cryptography-base'),
  // ),
  // ...listPackage(
  //   'ethereum-cryptography',
  //   resolveTo('../src/lib/_moke-ethereum-cryptography'),
  // ),
  // ...listPackage('ethereum-common', resolveTo('../src/lib/ethereum/common')),
]);
