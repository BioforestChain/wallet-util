import { deepEqual } from 'node:assert';
import { createHmac, webcrypto } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getBip39 } from './modules.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IS_BUNDLED = __dirname.endsWith('dist') === false;

Reflect.set(globalThis, 'crypto', webcrypto);
// if (IS_BUNDLED) {
//   Reflect.set(globalThis, 'Buffer', undefined);
// }

/// 初始化安装
await (async () => {
  const { setup } = await import('./index.mjs');

  const ASSETS_PATH = path.resolve(
    __dirname,
    IS_BUNDLED ? './assets' : '../assets',
  );
  await setup({
    wasmBaseUrl: ASSETS_PATH,
    async wasmLoader(wasmUri) {
      console.log('loading', wasmUri);
      return new Uint8Array(await readFile(wasmUri)).buffer;
    },
  });
  console.log('🎉 setup done!');
})();

/// hash-wasm
await (async () => {
  const { bip39 } = await getBip39();
})();

/// 助记词
await (async () => {
  const { walletUtil } = await import('./index.mjs');
  const { mnemonic, seedBuff } = await walletUtil.generateRandomMnemonic(12);
  console.log('mnemonic:', mnemonic);
  console.log('seedBuff:', seedBuff.toString('hex'));
  deepEqual(await walletUtil.findPhraseErrors(mnemonic), undefined);
  console.log(
    'calcForDerivationPath:',
    await walletUtil.calcForDerivationPath(
      'TRX - Tron',
      seedBuff.toString('hex'),
      0,
    ),
  );
})();

/// 测试算法库
await (async () => {
  const { prepareBip32 } = await import('./lib/bip32/_setup.mjs');
  await prepareBip32();

  const { hmacSHA512 } = await import('./lib/bip32/crypto.mjs');

  const key = Buffer.from('key');
  const data = Buffer.from('data');
  deepEqual(
    hmacSHA512(key, data).toString('hex'),
    createHmac('sha512', key).update(data).digest('hex'),
    'hmac 算法异常',
  );
})();

/// RUN DEMO
await (async () => {
  const { walletUtil } = await import('./index.mjs');

  const testRes = await walletUtil.calcForDerivationPath(
    'ETH - Ethereum',
    '208ea2315c340b913f36f8cca16ed04396b3ec2ce0a20bb4eec7f473824af7a32217161f65f93901dd9ebaf2d3b090cee46355b853f513dff8e75f3a4f5245f6',
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
    '派生路径生成ETH地址异常',
  );
  console.log(testRes);
})();

await (async () => {
  const { walletUtil } = await import('./index.mjs');

  const testRes = await walletUtil.calcForDerivationPath(
    'TRX - Tron',
    '208ea2315c340b913f36f8cca16ed04396b3ec2ce0a20bb4eec7f473824af7a32217161f65f93901dd9ebaf2d3b090cee46355b853f513dff8e75f3a4f5245f6',
    0,
  );
  deepEqual(
    {
      privkey:
        '695073298f70902d9e6eee3e30779e92fefc52999f034f27bcddb8c73d44a740',
      pubkey:
        '038204f94ad43fb86d9b1ab511c8887d8991d1ca7fa6a759be75772bdfb691e18c',
      address: 'TVuDMsMbG9K3sJsGX3vvS7t7dynaN3hVwH',
    },
    testRes,
    '派生路径生成TRX地址异常',
  );
  console.log(testRes);
})();

await (async () => {
  const { walletUtil } = await import('./index.mjs');
  console.log('BTC - Bitcoin Testnet: from seed');
  const purpose = 44;
  const coinName = 'BTC - Bitcoin Testnet';
  const testRes = await walletUtil.calcForDerivationPath(
    coinName,
    '6bb5ec876061761f2313a83f86382ff71fe6b8c383b4482f449e52b645e829fa2058aea7f8e7c6c8f59a9e884248f2b3c71851010c003bb27de91262c7b5ccd6',
    0,
    purpose,
  );
  console.log(testRes);
  console.log('BTC - Bitcoin Testnet: from privateKey');
  const testPrivateKeyRes = await walletUtil.getBitcoinAddressFromPrivateKey(
    testRes.privkey,
    coinName,
    purpose,
  );
  console.log(testPrivateKeyRes);

  deepEqual(
    testRes,
    testPrivateKeyRes,
    '派生路径生成 跟私钥生成的Bitcoin地址异常',
  );
})();

console.log('✅ all test passed.');
