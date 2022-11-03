import { $Config, setConfig } from './lib/assetLoader.mjs';
import { cacheCall } from './lib/utils.mjs';
export * as buffer from './lib/buffer.mjs';
export * as crypto from './lib/crypto.mjs';

export const setup = cacheCall(async (options?: Partial<$Config>) => {
  if (options) {
    await setConfig(options);
  }
});
import * as modules from './modules.mjs';
import * as walletUtil from './wallet.mjs';

export { modules, walletUtil };
export type $Modules = typeof modules;
export type $WalletUtil = typeof walletUtil;

/// internal types
export * from './types.mjs';
