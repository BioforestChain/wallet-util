'use strict';

import { cbc128 } from './cbc.mjs';

import { ExternallyOwnedAccount } from '../abstract-signer/index.mjs';
import { getAddress } from '../address/index.mjs';
import { arrayify, Bytes } from '../bytes/index.mjs';
import { keccak256 } from '../../_moke-ethers/keccak256/index.mjs';
import { pbkdf2 } from '../../_moke-ethers/pbkdf2/index.mjs';
import { toUtf8Bytes } from '../strings/index.mjs';
import { Description } from '../properties/index.mjs';

import { Logger } from '../logger/index.mjs';
import { version } from './_version.mjs';
const logger = new Logger(version);

import { getPassword, looseArrayify, searchPath } from './utils.mjs';

export interface _CrowdsaleAccount {
  address: string;
  privateKey: string;

  _isCrowdsaleAccount: boolean;
}

export class CrowdsaleAccount
  extends Description<_CrowdsaleAccount>
  implements ExternallyOwnedAccount
{
  readonly address: string;
  readonly privateKey: string;
  readonly mnemonic?: string;
  readonly path?: string;

  readonly _isCrowdsaleAccount: boolean;

  isCrowdsaleAccount(value: any): value is CrowdsaleAccount {
    return !!(value && value._isCrowdsaleAccount);
  }
}

// See: https://github.com/ethereum/pyethsaletool
export async function decrypt(
  json: string,
  password: Bytes | string,
): Promise<ExternallyOwnedAccount> {
  const data = JSON.parse(json);

  password = getPassword(password);

  // Ethereum Address
  const ethaddr = getAddress(searchPath(data, 'ethaddr'));

  // Encrypted Seed
  const encseed = looseArrayify(searchPath(data, 'encseed'));
  if (!encseed || encseed.length % 16 !== 0) {
    logger.throwArgumentError('invalid encseed', 'json', json);
  }

  const key = arrayify(pbkdf2(password, password, 2000, 32, 'sha256')).slice(
    0,
    16,
  );

  const iv = encseed.slice(0, 16);
  const encryptedSeed = encseed.slice(16);

  // Decrypt the seed
  const seed = await cbc128.decrypt(key, iv, encryptedSeed);

  // This wallet format is weird... Convert the binary encoded hex to a string.
  let seedHex = '';
  for (let i = 0; i < seed.length; i++) {
    seedHex += String.fromCharCode(seed[i]);
  }

  const seedHexBytes = toUtf8Bytes(seedHex);

  const privateKey = keccak256(seedHexBytes);

  return new CrowdsaleAccount({
    _isCrowdsaleAccount: true,
    address: ethaddr,
    privateKey: privateKey,
  });
}
