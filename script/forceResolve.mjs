// @ts-check
import { createResolveTo } from './resolveTo.mjs';
import { walkDir } from './walkFile.mjs';
import fs from 'node:fs';
import path from 'node:path';

const resolveTo = createResolveTo(import.meta.url);

for (const { filepath, dirname } of walkDir(resolveTo('../src'))) {
  if (
    filepath.endsWith('.js') ||
    filepath.endsWith('.cjs') ||
    filepath.endsWith('.d.cts')
  ) {
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const fileResolveTo = createResolveTo(filepath);
    /**
     *
     * @param {string} somepath
     */
    const doReplace = (somepath) => {
      if (somepath.startsWith('node:')) {
        return somepath;
      }
      if (somepath.startsWith('.') === false) {
        const maybeLib = resolveTo(`../src/lib/${somepath}`);
        try {
          if (
            fs.existsSync(maybeLib) ||
            fs.existsSync(path.dirname(maybeLib))
          ) {
            somepath = path.relative(dirname, maybeLib).replace(/\\+/g, '/');
          }
        } catch {}
      }

      for (const maybepath of [
        somepath.endsWith('.mjs') ? somepath.replace(/mjs$/, 'mts') : undefined,
        somepath.endsWith('.js') ? somepath.replace(/js$/, 'cjs') : undefined,
        somepath,
        somepath + '.js',
        somepath + '.cjs',
        somepath + '/index.js',
        somepath + '/index.cjs',
        somepath.replace(/cjs$/, 'd.cts'),
        somepath + '.d.cts',
        somepath + '/index.d.cts',
      ]) {
        if (!maybepath) {
          continue;
        }
        try {
          if (fs.statSync(fileResolveTo(maybepath)).isFile()) {
            if (maybepath.endsWith('.d.cts')) {
              return maybepath.replace(/\.d\.cts$/, '.cjs');
            }
            if (maybepath.endsWith('.js')) {
              return maybepath.replace(/\.js$/, '.cjs');
            }
            return maybepath;
          }
        } catch {}
      }
      throw new Error(
        `could not resolve:'${somepath}' in '${path.relative(
          process.cwd(),
          filepath
        )}'`
      );
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
  }
}
