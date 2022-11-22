import { keccak256 } from '../../_moke-ethers/keccak256/index.mjs';
import { toUtf8Bytes } from '../strings/index.mjs';

export function id(text: string): string {
  return keccak256(toUtf8Bytes(text));
}
