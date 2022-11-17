// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import { ALERTNATIVE_LIBS } from './migrate-alertnative.mjs';
import { migratePackages } from './migrate-file.mjs';
import { createResolveTo } from './resolveTo.mjs';
const resolveTo = createResolveTo(import.meta.url);

const doMigrate = async () => {
  const FROM_ROOT = path.normalize(`D:/dev/GitHub/ethereumjs-monorepo/`);
  const TO_ROOT = resolveTo('../src/lib/ethereum');

  // 清空DEST
  fs.rmSync(TO_ROOT, { recursive: true, force: true });

  /** ethereum 的包 */
  const ethereum_packages = new Set(
    fs.readdirSync(path.resolve(FROM_ROOT, './packages')),
  );
  {
    const ignore_packages = new Set([
      ///
      'block',
      'blockchain',
      'client',
      // "common",
      'devp2p',
      'ethash',
      'ethereum-tests',
      'evm',
      // 'rlp',
      'statemanager',
      'trie',
      // "tx",
      // "util",
      'vm',
    ]);
    for (const packageName of ignore_packages) {
      ethereum_packages.delete(packageName);
    }
    for (const packageName of ethereum_packages) {
      ALERTNATIVE_LIBS.set(
        `@ethereumjs/${packageName}`,
        resolveTo(`../src/lib/ethereum/${packageName}/index.mjs`),
      );
    }
  }

  /**
   * @type {import("./migrate.type.mjs").$MigrateTasks}
   */
  const tasks = new Map();
  for (const packageName of ethereum_packages) {
    tasks.set(packageName, {
      from_source_dir: path.resolve(FROM_ROOT, 'packages', packageName, 'src'),
      to_source_dir: path.resolve(TO_ROOT, packageName),
    });
  }

  migratePackages(tasks, ALERTNATIVE_LIBS, {
    readContent(ctx) {
      /// 移除 asyncEventEmitter
      {
        if (ctx.fileEntry.filename === 'asyncEventEmitter.ts') {
          return 0;
        }
        if (ctx.fileEntry.filename === 'index.ts') {
          return ctx.fileContent.replace(
            `export * from './asyncEventEmitter';`,
            '// $&',
          );
        }
      }
      /// 修改 import json 成标准写法
      return ctx.fileContent.replace(
        /import \* as (\w+) from '([^\']+?\.json)';/g,
        `import * as $1 from '$2' assert {type:'json'};`,
      );
    },
  });
};

doMigrate();
