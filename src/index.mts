import { $Config, setConfig } from './lib/assetLoader.mjs';
import { cacheCall } from './lib/utils.mjs';
import * as modules from './modules.mjs';
import * as walletUtil from './wallet.mjs';
export * as buffer from './lib/buffer.mjs';
export * as crypto from './lib/crypto.mjs';
/// internal types
export * from './types.mjs';
export { modules, walletUtil };

export interface $SetupConfig extends $Config {
  preload: boolean;
}

export const setup = cacheCall(async (options: Partial<$SetupConfig> = {}) => {
  await setConfig(options);
  // 预加载
  if (options.preload && typeof requestIdleCallback === 'function') {
    const requestIdle = () => new Promise((cb) => requestIdleCallback(cb));
    const modules = await import('./modules.mjs');
    for (const [name, prepareTask] of Object.entries(modules)) {
      if (typeof prepareTask === 'function' && name.startsWith('get')) {
        await requestIdle();
        await prepareTask();
      }
    }
  }
});

export type $Modules = typeof modules;
export type $WalletUtil = typeof walletUtil;
