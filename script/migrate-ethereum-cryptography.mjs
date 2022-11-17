// @ts-check

import path from 'path';
import { ALERTNATIVE_LIBS } from './migrate-alertnative.mjs';
import { migratePackages } from './migrate-file.mjs';
import { createResolveTo } from './resolveTo.mjs';
const resolveTo = createResolveTo(import.meta.url);

const doMigrate = async () => {
  /**
   * @type {import("./migrate.type.mjs").$MigrateTasks}
   */
  const task = new Map();
  task.set('ethereum-cryptography', {
    from_source_dir: 'D:/dev/GitHub/js-ethereum-cryptography/src',
    to_source_dir: resolveTo('../src/lib/_moke-ethereum-cryptography-base'),
  });

  await migratePackages(task, ALERTNATIVE_LIBS, {
    readContent(ctx) {
      //  console.log('ctx.fileEntry.dirname', ctx.fileEntry.relative);
      /// 移除 bip39
      if (ctx.fileEntry.relative.includes('bip39')) {
        return 0;
      }

      switch (ctx.fileEntry.filename) {
        case 'hdkey.ts':
        case 'keccak.ts':
        case 'scrypt.ts':
        case 'pbkdf2.ts':
        // case 'pbkdf2.ts':
        case 'secp256k1-compat.ts':
        case 'secp256k1.ts':
          return 0;
        // return ctx.fileContent
        //   .replace(/(getSharedSecret|Point|Signature|schnorr)/g, '// $&')
        //   .replace(/_utils.hmacSha256Sync[\s\S]+/, (s) => {
        //     return s
        //       .split('\n')
        //       .map((line) => (line.trim().length > 0 ? '// ' + line : line))
        //       .join('\n');
        //   });
      }
    },
  });
};

doMigrate();
