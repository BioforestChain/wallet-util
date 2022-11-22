// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import { ALERTNATIVE_LIBS } from './migrate-alertnative.mjs';
import { migratePackages } from './migrate-file.mjs';
import { createResolveTo } from './resolveTo.mjs';
const resolveTo = createResolveTo(import.meta.url);

const doMigrate = async () => {
  const FROM_ROOT = path.normalize(`D:/dev/GitHub/ethers.js/`);
  const TO_ROOT = resolveTo('../src/lib/ethers');

  // 清空DEST
  fs.rmSync(TO_ROOT, { recursive: true, force: true });

  /** ethereum 的包 */
  const ethers_packages = new Set(
    fs.readdirSync(path.resolve(FROM_ROOT, './packages')),
  );
  {
    const ignore_packages = new Set([
      ///
      // "abi",
      // "abstract-provider",
      // "abstract-signer",
      // "address",
      'asm',
      // "base64",
      // "basex",
      // "bignumber",
      // "bytes",
      'cli',
      // "constants",
      // "contracts",
      // "ethers",
      'experimental',
      'hardware-wallets',
      // "hash",
      // "hdnode",
      // "json-wallets",
      'keccak256',
      // "logger",
      // "networks",
      "pbkdf2",
      // "properties",
      // "providers",
      // "random",
      // "rlp",
      "sha2",
      'shims',
      // "signing-key",
      // "solidity",
      // "strings",
      'testcases',
      'tests',
      // "transactions",
      // "units",
      // "wallet",
      // "web",
      // "wordlists",
    ]);
    for (const packageName of ignore_packages) {
      ethers_packages.delete(packageName);
    }

    for (const packageName of ethers_packages) {
      ALERTNATIVE_LIBS.set(
        `@ethersproject/${packageName}`,
        resolveTo(`../src/lib/ethers/${packageName}/index.mjs`),
      );
    }
    for (const packageName of fs.readdirSync(
      resolveTo('../src/lib/_moke-ethers'),
    )) {
      ALERTNATIVE_LIBS.set(
        `@ethersproject/${packageName}`,
        resolveTo(`../src/lib/_moke-ethers/${packageName}/index.mjs`),
      );
    }
  }

  /**
   * @type {import("./migrate.type.mjs").$MigrateTasks}
   */
  const tasks = new Map();
  for (const packageName of ethers_packages) {
    tasks.set(packageName, {
      from_source_dir: path.resolve(
        FROM_ROOT,
        'packages',
        packageName,
        'src.ts',
      ),
      to_source_dir: path.resolve(TO_ROOT, packageName),
    });
  }

  migratePackages(tasks, ALERTNATIVE_LIBS, {
    readContent(ctx) {
      const { filepath, filename } = ctx.fileEntry;
      if (filename.startsWith('browser-')) {
        return 0;
      }
      const browser_filepath =
        filepath.slice(0, -filename.length) + `browser-${filename}`;
      if (ctx.tree.has(browser_filepath)) {
        console.log('use browser-', filename);
        return ctx.tree.read(browser_filepath);
      }

      if (filename === 'bignumber.ts') {
        return ctx.fileContent.replace(
          [`import _BN from "bn.js";`, `import BN = _BN.BN;`].join('\n'),
          `import BN from "bn.js";`,
        );
      }
    },
  });
};

doMigrate();
