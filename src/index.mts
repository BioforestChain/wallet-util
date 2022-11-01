import { $Config, setConfig } from './lib/assetLoader.mjs';
import { cacheCall } from './lib/utils.mjs';

export const setup = cacheCall(async (options?: Partial<$Config>) => {
  if (options) {
    await setConfig(options);
  }
  const bip39 = await import('./lib/bip39.mjs');
  const networks = await import('./lib/networks.mjs');
  return { bip39, networks };
});
export type $WalletUtil = Awaited<ReturnType<typeof setup>>;
