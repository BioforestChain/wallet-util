// @ts-check

import path from 'node:path';
import { ALERTNATIVE_LIBS } from './migrate-alertnative.mjs';
import { migratePackages } from './migrate-file.mjs';
import { createResolveTo } from './resolveTo.mjs';
const resolveTo = createResolveTo(import.meta.url);

const doMigrate = async () => {
  const TO_ROOT = resolveTo('../src/lib/ethereum');

  /**
   * @type {import("./migrate.type.mjs").$MigrateTasks}
   */
  const tasks = new Map();
  tasks.set('ethereumjs-common', {
    from_source_dir: path.normalize(`D:/dev/GitHub/ethereumjs-common/src`),
    to_source_dir: path.resolve(TO_ROOT, `common`),
  });
  // tasks.set('ethereumjs-tx', {
  //   from_source_dir: path.normalize(`D:/dev/GitHub/ethereumjs-tx/src`),
  //   to_source_dir: path.resolve(TO_ROOT, `tx`),
  // });

  await migratePackages(tasks, ALERTNATIVE_LIBS, {
    readContent(ctx) {
      // console.log(ctx.fileEntry.filename)
      switch (ctx.fileEntry.filename) {
        case 'fake.ts':
          return 0;
      }
    },
    writeContent(ctx) {
      return ctx.fileContent.replace(
        /export (?!from).+from '\.\/fake.mjs'/g,
        '// $&',
      );
    },
  });
};
doMigrate();
