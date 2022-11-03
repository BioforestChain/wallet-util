import { Bs58CheckFactory } from './base.mjs';
import { sha256x2 } from './crypto.mjs';

export { Bs58CheckFactory } from './base.mjs';

export const bs58check = Bs58CheckFactory(sha256x2);
