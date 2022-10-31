/**
 * The library config
 */
export interface $Config {
  wasmBaseUrl: string;
  wasmLoader: (wasmUri: string) => Promise<BufferSource>;
}
/**
 * Current config
 */
export const config: $Config = {
  wasmBaseUrl: '/assets/wallet-util-wasm',
  wasmLoader: (wasmUrl) => fetch(wasmUrl).then((res) => res.arrayBuffer()),
};
export async function setConfig(options: Partial<$Config>) {
  Object.assign(config, options);
}
