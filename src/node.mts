import { webcrypto } from 'node:crypto';
Reflect.set(globalThis, 'crypto', webcrypto);
Reflect.set(globalThis, 'Buffer', undefined);

(async () => {
  await import('./index.mjs');
})();
