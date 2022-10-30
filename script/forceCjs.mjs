// @ts-check
import { createResolveTo } from './resolveTo.mjs';
import { walkDir } from './walkFile.mjs';
import fs from 'node:fs';
import path from 'node:path';

const resolveTo = createResolveTo(import.meta.url);

for (const { filepath } of walkDir(resolveTo('../src'))) {
  if (
    filepath.endsWith('.js') ||
    filepath.endsWith('.mjs') ||
    filepath.endsWith('.mts')
  ) {
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    /**
     *
     * @param {string} somepath
     */
    const doReplace = (somepath) => {
      return somepath.replace(/\.js$/, '.cjs');
    };

    const newFileContent = fileContent
      .replace(
        /require\('([^\']+?)'\)/g,

        (_, somepath) => `require('${doReplace(somepath)}')`
      )
      .replace(
        /from '([^\']+?)'/g,
        (_, somepath) => `from '${doReplace(somepath)}'`
      )
      .replace(
        /import\('([^\']+?)'\)/g,
        (_, somepath) => `import('${doReplace(somepath)}')`
      );
    if (newFileContent !== fileContent) {
      fs.writeFileSync(filepath, newFileContent);
    }
    const newFilepath = doReplace(filepath);
    if (newFilepath !== filepath) {
      fs.renameSync(filepath, doReplace(filepath));
    }
  } else if (filepath.endsWith('.d.ts')) {
    const newFilepath = filepath.replace(/\.ts$/, '.cts');
    if (newFilepath !== filepath) {
      fs.renameSync(filepath, newFilepath);
    }
  }
}
