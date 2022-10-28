// @ts-check
import { createResolveTo } from './resolveTo.mjs';
import { walkDir } from './walkFile.mjs';
import fs from 'node:fs';
import path from 'node:path';

import jsbuildinfo from '../dist/tsconfig.js.tsbuildinfo.json' assert { type: 'json' };

const resolveTo = createResolveTo(import.meta.url);
const resolveTo2 = createResolveTo(
    resolveTo('../dist/tsconfig.js.tsbuildinfo.json')
);
const tree = new (class Tree {
    cache = new Map();
    read(filepath) {
        let content = this.cache.get(filepath);
        if (content === undefined) {
            content = fs.readFileSync(filepath, 'utf-8');
            this.cache.set(filepath, content);
        }
        return content;
    }
    write(filepath, content) {
        this.cache.set(filepath, content);
    }
    save() {
        for (const [filepath, content] of this.cache) {
            fs.writeFileSync(filepath, content);
        }
        this.cache.clear();
    }
})();

for (const module_dig of jsbuildinfo.program.semanticDiagnosticsPerFile) {
    if (typeof module_dig === 'number') {
        continue;
    }

    for (const file_digs of module_dig) {
        if (typeof file_digs === 'number') {
            continue;
        }
        /// 这里要倒序，确保错误处理正常
        for (const dig of file_digs.reverse()) {
            if (dig.file.endsWith('.js') === false) {
                continue;
            }
            const filepath = resolveTo2(dig.file);
            let fileContent = tree.read(filepath);

            const errorBeforeContent = fileContent.slice(0, dig.start);
            const lastLineIndex = errorBeforeContent.lastIndexOf('\n');
            if (lastLineIndex === -1) {
                fileContent = '//@ts-ignore\n' + fileContent;
            } else {
                const lastLineSpaceWidth =
                    errorBeforeContent
                        .slice(lastLineIndex + 1)
                        .match(/^\s+/)?.[0].length ?? 0;
                fileContent =
                    errorBeforeContent.slice(0, lastLineIndex) +
                    '\n' +
                    ' '.repeat(lastLineSpaceWidth) +
                    '//@ts-ignore' +
                    errorBeforeContent.slice(lastLineIndex);
            }
            tree.write(filepath, fileContent);
        }
    }
}

tree.save();
