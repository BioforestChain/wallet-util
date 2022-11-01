# wallet-util

web3 wallet util for browser.
一个 Web3 钱包所需的 js 库，专门为现代浏览器环境进行优化。

the javascript file < 300kb, wasm < 200kb. (wasm files are loaded on demand).
js 部分不到 300kb, wasm 不到 200kb，采用按需加载，主要是要载入 secp256k1（119kb）。

## How to use in browser 如何在浏览器中使用

> this bundle should not be rebundle again. so just put bundle files to your assets/static folder.
> 本项目已经是一个打包完成的项目，所以直接把它放到您的资源文件夹内，切莫在您的编译文件中再次进行导入，这极有可能会导致二次编译打包，从而失去最佳的优化。

1. download the bundle 安装依赖
   ```bash
   npm install @bnqkl/wallet-util -D
   ```
1. coye those bundle files(`node_module/@bnqkl/wallet-util/build/web`) to your assets folder. 将 `node_module/@bnqkl/wallet-util/build/web` 中的内容拷贝到您的资源资源文件夹中.
   ```bash
   copy -r ./node_module/@bnqkl/wallet-util/build/web/* ./static/wallet-util/
   ```
1. import and setup. 导入并进行初始化.

   1. in your html 在 html 文件中导入并安装

      ```html
      <!-- eg: index.html -->
      <script type="module">
        import { setup } from './static/wallet-util';
        globalThis.walletUtil = setup({
          // wasm files will use `fetch` to download.
          // 这里将会用 `fetch` 来下载 wasm 文件.
          wasmBaseUrl: './static/wallet-util/assets',
        });
      </script>
      ```

   1. in your typescript declaration file: 在你的全局类型定义文件中，定义 walletUtil：

      ```ts
      /* eg: global.d.ts */
      declare const walletUtil: Promise<
        typeof import('@bnqkl/wallet-util')['$WalletUtil']
      >;
      ```

   1. in you typescript project file: 在你的项目代码中，使用它：

      ```ts
      const {
        bip39: { calcForDerivationPath, DERIVATION_PATH },
        networks: { COIN_SYMBOL },
      } = await walletUtil;

      const testRes = await calcForDerivationPath(
        COIN_SYMBOL.ETH,
        '208ea2315c340b913f36f8cca16ed04396b3ec2ce0a20bb4eec7f473824af7a32217161f65f93901dd9ebaf2d3b090cee46355b853f513dff8e75f3a4f5245f6',
        DERIVATION_PATH.ETH,
        0, // index
      );
      console.log(testRes);
      ```

## Hot it work? 项目原理

这个项目把一个 web3 钱包所需要用到的 npm 包全部从 npm 上下载下来（MIT 协议）。大部分是 cjs，我手动进行了维护，包括：

1. `base-x`
1. `base64-js`
1. `bech32`
1. `bip174`
1. `bip32`
1. `bitcoinjs-lib`
1. `bs58`
1. `bs58check`
1. `buffer`
1. `cipher-base`
1. `create-hash`
1. `create-hmac`
1. `ecpair`
1. `events`
1. `hash-base`
1. `hash-wasm`
1. `ieee754`
1. `inherits`
1. `md5.js`
1. `minimalistic-assert`
1. `minimalistic-crypto-utils`
1. `process`
1. `ripemd160`
1. `sha.js`
1. `string_decoder`
1. `tiny-secp256k1`
1. `readable-stream`
1. `typeforce`
1. `varuint-bitcoin`
1. `wif`

大部分项目都被手动进行了裁剪，并做了一定的改写。比如`readable-stream`源码很大，而我们只用到了 Transform 模块，所以这里是提取了 Transform 相关的主要代码，一些次要代码和无关代码都被删除。留下的代码我将它放在`tiny-stream`文件夹中。

还有一些关系到 wasm 的，我 fork 了原项目，手动进行了代码修改，包括 `hash-wasm`与`tiny-secp256k1`两个项目。
