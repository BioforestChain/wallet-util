// @ts-check
import { createResolveTo } from './resolveTo.mjs';
import { walkDir } from './walkFile.mjs';
import fs from 'node:fs';
import path from 'node:path';

const resolveTo = createResolveTo(import.meta.url);

for (const { filepath } of walkDir(resolveTo('../src'))) {
    if (filepath.endsWith('.js') === false) {
        continue;
    }
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const fileResolveTo = createResolveTo(filepath);

    const newFileContent = fileContent.replace(
        /require\('([^\)]+?)'\)/g,
        /**
         *
         * @param {string} _
         * @param {string} somepath
         * @returns
         */
        (_, somepath) => {
            for (const maybepath of [
                somepath.endsWith('.mjs')
                    ? somepath.replace(/mjs$/, 'mts')
                    : undefined,
                somepath,
                somepath + '.js',
                somepath + '/index.js',
            ]) {
                if (!maybepath) {
                    continue;
                }
                try {
                    if (fs.statSync(fileResolveTo(maybepath)).isFile()) {
                        return `require('${maybepath}')`;
                    }
                } catch {}
            }
            throw new Error(
                `could not resolve:'${somepath}' in '${path.relative(
                    process.cwd(),
                    filepath
                )}'`
            );
        }
    );
    if (newFileContent !== fileContent) {
        fs.writeFileSync(filepath, newFileContent);
    }
}
