import { $Config, setConfig } from './lib/assetLoader.mjs';

let setupResult: ReturnType<typeof _setup> | undefined;
export async function _setup(options?: Partial<$Config>) {
  if (options) {
    await setConfig(options);
  }
  const bip39 = await import('./lib/bip39.mjs');
  const networks = await import('./lib/networks.mjs');
  return { bip39, networks };
}
export async function setup(options?: Partial<$Config>) {
  return (setupResult ??= _setup(options));
}
