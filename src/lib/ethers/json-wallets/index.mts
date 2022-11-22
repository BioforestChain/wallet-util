'use strict';

import { Bytes } from '../bytes/index.mjs';
import { ExternallyOwnedAccount } from '../abstract-signer/index.mjs';

import { decrypt as decryptCrowdsale } from './crowdsale.mjs';
import {
  getJsonWalletAddress,
  isCrowdsaleWallet,
  isKeystoreWallet,
} from './inspect.mjs';
import {
  decrypt as decryptKeystore,
  encrypt as encryptKeystore,
  EncryptOptions,
  ProgressCallback,
} from './keystore.mjs';

function decryptJsonWallet(
  json: string,
  password: Bytes | string,
  progressCallback?: ProgressCallback,
): Promise<ExternallyOwnedAccount> {
  if (isCrowdsaleWallet(json)) {
    if (progressCallback) {
      progressCallback(0);
    }
    const account = decryptCrowdsale(json, password);
    if (progressCallback) {
      progressCallback(1);
    }
    return Promise.resolve(account);
  }

  if (isKeystoreWallet(json)) {
    return decryptKeystore(json, password, progressCallback);
  }

  return Promise.reject(new Error('invalid JSON wallet'));
}

export {
  decryptCrowdsale,
  decryptKeystore,
  encryptKeystore,
  isCrowdsaleWallet,
  isKeystoreWallet,
  getJsonWalletAddress,
  decryptJsonWallet,
  ProgressCallback,
  EncryptOptions,
};
