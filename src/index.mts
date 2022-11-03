import { $Config, setConfig } from './lib/assetLoader.mjs';
import { cacheCall } from './lib/utils.mjs';

export const setup = cacheCall(async (options?: Partial<$Config>) => {
  if (options) {
    await setConfig(options);
  }
  return await import('./setup.mjs');
});
export * from './wallet.mjs';
