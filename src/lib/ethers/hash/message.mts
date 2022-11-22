import { Bytes, concat } from '../bytes/index.mjs';
import { keccak256 } from '../../_moke-ethers/keccak256/index.mjs';
import { toUtf8Bytes } from '../strings/index.mjs';

export const messagePrefix = '\x19Ethereum Signed Message:\n';

export function hashMessage(message: Bytes | string): string {
  if (typeof message === 'string') {
    message = toUtf8Bytes(message);
  }
  return keccak256(
    concat([
      toUtf8Bytes(messagePrefix),
      toUtf8Bytes(String(message.length)),
      message,
    ]),
  );
}
