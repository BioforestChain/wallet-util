import { deepEqual } from 'node:assert';
import { webcrypto } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
Reflect.set(globalThis, 'crypto', webcrypto);
Reflect.set(globalThis, 'Buffer', undefined);

(async () => {
  const { setup } = await import('./index.mjs');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const ASSETS_PATH = path.resolve(
    __dirname,
    __dirname.endsWith('dist') ? '../assets' : './assets',
  );

  const {
    bip39: { calcForDerivationPath, DERIVATION_PATH },
    networks: { COIN_SYMBOL },
  } = await setup({
    wasmBaseUrl: ASSETS_PATH,
    async wasmLoader(wasmUri) {
      console.log('loading', wasmUri);
      return new Uint8Array(await readFile(wasmUri)).buffer;
    },
  });

  /// RUN DEMO

  const testRes = await calcForDerivationPath(
    COIN_SYMBOL.ETH,
    '208ea2315c340b913f36f8cca16ed04396b3ec2ce0a20bb4eec7f473824af7a32217161f65f93901dd9ebaf2d3b090cee46355b853f513dff8e75f3a4f5245f6',
    DERIVATION_PATH.ETH,
    0,
  );
  deepEqual(
    {
      privkey:
        '0x7467bdc870acb3615e84fe24a2417884128af83bbe0b7e77f043c9c6c79b624f',
      pubkey:
        '0x03dbb4930b2d9527c572b4287a0e90323179aeb0028140c4da0786a95ce906c273',
      address: '0x98f8a8D289D6e32976ECDaa6C31B2dBb47B2263B',
    },
    testRes,
  );
  console.log(testRes);
})();
