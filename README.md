# wallet-util

web3 wallet util for browser.
一个 Web3 钱包所需的 js 库，专门为现代浏览器环境进行优化。

the javascript file < 200kb, wasm < 200kb. (js module and wasm files are loaded on demand).
js 部分不到 300kb, wasm 不到 200kb，采用按需加载。

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
        import { setup, walletUtil } from './static/wallet-util';
        setup({
          // wasm files will use `fetch` to download.
          // 这里将会用 `fetch` 来下载 wasm 文件.
          wasmBaseUrl: './static/wallet-util/assets',
        });
        globalThis.walletUtil = walletUtil;
      </script>
      ```

   1. in your typescript declaration file: _在你的全局类型定义文件中，定义 walletUtil：_

      ```ts
      /* eg: global.d.ts */
      declare const walletUtil: Promise<
        typeof import('@bnqkl/wallet-util')['$WalletUtil']
      >;
      ```

   1. in you typescript project file: _在你的项目代码中，使用它：_

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

## API 接口

```ts
import { setup, walletUtil, modules } from './static/wallet-util';
```

1. `setup` Initial Installation. _初始化安装_
1. `walletUtil` Wallet function. _钱包功能_
   1. `generateRandomMnemonic` Generate mnemonics. _生成助记词_
   1. `calcForDerivationPath` Calculate addresses based on coin-derived paths. _计算基于币种派生路径的地址_
1. `modules` Various core modules. _各类核心模块_
   1. `getBitcoin`
   1. `getTinySecp256k1`
   1. `getBip39`
   1. `getBip32`
   1. `getEcpair`
   1. `getNetworks` Web3 networks, including their coin information. _Web3 网络，包括它们的币种信息_
   1. `getEthereumUtil`

### export type/interface 导出的类型定义

1. `$CoinName` All Currencies Nouns. _所有币种名词_
1. `$DerivationPath` Derivation paths for all coins. _所有币种的派生路径_
1. `$NetworkName` All network names. _所有网络名称_
1. `$Network` Data structure of a network. _一个网络的数据结构_
1. `$Language` All coin nomenclature species. _所有的助记词语种_
1. `$Sha3Bits` Sha3 supported export lengths. _Sha3 所支持的导出长度_

## Hot it work? 项目原理

Inspired by [iancoleman.io/bip39/](iancoleman.io/bip39/) _受到 [iancoleman.io/bip39/](iancoleman.io/bip39/) 的启发_

> Github: [github.com/iancoleman/bip39](https://github.com/iancoleman/bip39)

I have audited and rewritten the code for almost all core modules:
几乎所有核心的模块我都对代码进行了审计并重写：

1. The biggest change is `hash-wasm`. Almost the entire library was rewritten and the synchronization interface was exposed.
   _其中力度最大的是 `hash-wasm`。几乎整个库重写，并暴露出了同步的接口。_
   > The prerequisite for using the synchronization interface is to `prepare`, that is, to download and compile wasm. _使用同步的接口前提是要进行 `prepare`，也就是 wasm 的下载与编译的工作。_
1. The overall project style also revolves around this step. _整体项目风格也是围绕这个步骤展开：_
   1. the `_setup.mts` file is used to pre-process the module's synchronization functions. `_setup.mts` _文件用来对模块的同步函数进行预处理_
   1. the dependencies between modules are first reflected in each module's own `_setup.mts`. _模块之间的依赖首先会在各个模块自身的 `_setup.mts` 中体现出来_
1. I replaced `secp256k1` with `tiny-secp256k1` because the latter is optimized for nodejs and uses a lot of js for the web version for compatibility. _然后是 `tiny-secp256k1`，我用它替换了 `secp256k1`，因为后者主要针对 nodejs 优化，对于 web 版本的使用了大量的 js 来做兼容。_
   > `tiny-secp256k1` is mainly a modification of its installation logic to make it more intuitive to install and use in the browser
   > . _`tiny-secp256k1` 主要是修改了它的安装逻辑，使之能更加直观地在浏览器中安装并使用_
1. `bs58check`, `bip32`, `bip39`, `bitcoinjs-lib`, `ethereumjs-util` modules, replacing the modules it depends on while keeping the original project source code as much as possible. _接着是 `bs58check`、`bip32`、`bip39`、`bitcoinjs-lib`、`ethereumjs-util` 这些模块，在尽可能保持原有项目源码的情况下，对它所依赖的模块进行了替换。_
