import { cacheCall } from '../utils.mjs';
import { init } from './index.mjs';
import { instantiateWasm } from './wasm_loader.mjs';

export const prepareTinySecp256k1 = cacheCall(async () => {
  init(await instantiateWasm());
});
