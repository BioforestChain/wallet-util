// @ts-check
import path from 'node:path';
import fs from 'node:fs';
/**
 *
 * @param {string} dirname
 * @returns {Generator<{dirname:string,filepath:string,filename:string}>}
 */
export function* walkDir(dirname, depth = Infinity) {
    if (depth <= 0) {
        return;
    }
    for (const filename of fs.readdirSync(dirname)) {
        const filepath = path.join(dirname, filename);
        if (fs.statSync(filepath).isDirectory()) {
            yield* walkDir(filepath, depth - 1);
        } else {
            yield {
                dirname,
                filepath,
                filename,
            };
        }
    }
}
