// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import { ALERTNATIVE_LIBS } from './migrate-alertnative.mjs';
import { migratePackages } from './migrate-file.mjs';
import { createResolveTo } from './resolveTo.mjs';
const resolveTo = createResolveTo(import.meta.url);

const doMigrate = async () => {
  const FROM_ROOT = path.normalize(`D:/dev/GitHub/web3.js/`);
  const TO_ROOT = resolveTo('../src/lib/web3');

  // 清空DEST
  fs.rmSync(TO_ROOT, { recursive: true, force: true });

  /** web3 的包 */
  const web3_packages = new Set(
    fs
      .readdirSync(path.resolve(FROM_ROOT, './packages'))
      .filter((name) => name.startsWith('web3')),
  );
  {
    const ignore_packages = new Set([
      ///
      'web3-providers-ws',
      'web3-providers-ipc',
      //   'web3-eth-abi',
      //   'web3-eth-contract',
      //   'web3-validator',
    ]);
    for (const packageName of ignore_packages) {
      web3_packages.delete(packageName);
    }
  }

  /**
   * @type {import("./migrate.type.mjs").$MigrateTasks}
   */
  const tasks = new Map();
  for (const packageName of web3_packages) {
    tasks.set(packageName, {
      from_source_dir: path.resolve(FROM_ROOT, 'packages', packageName, 'src'),
      to_source_dir: path.resolve(TO_ROOT, packageName),
    });
  }

  ALERTNATIVE_LIBS.set(
    'web3-providers-ws',
    resolveTo('../src/_moke-web3/web3-providers-ws.mjs'),
  );
  ALERTNATIVE_LIBS.set(
    'web3-providers-ipc',
    resolveTo('../src/_moke-web3/web3-providers-ipc.mjs'),
  );
  ALERTNATIVE_LIBS.set(
    '@ethereumjs/common',
    resolveTo('../src/lib/ethereum/common/index.mjs'),
  );

  migratePackages(tasks, ALERTNATIVE_LIBS);
};

doMigrate();
