// @ts-check
import path from 'node:path';
import fs from 'node:fs';
/**
 * @param {string} dirname
 * @param { import("./walkFile.type.mjs").$WalkOptions =} options
 * @returns {Generator<import('./walkFile.type.mjs').$Entry>}
 */
export function* walkDir(dirname, options = {}) {
  dirname = path.normalize(dirname);
  const { depth = Infinity, cwd = dirname } = options;
  if (depth <= 0) {
    return;
  }
  for (const filename of fs.readdirSync(dirname)) {
    const filepath = path.join(dirname, filename);
    if (fs.statSync(filepath).isDirectory()) {
      yield* walkDir(filepath, { cwd, depth: depth - 1 });
    } else {
      yield {
        dirname,
        filepath,
        filename,
        cwd,
        get relative() {
          return filepath.slice(cwd.length + 1);
        },
      };
    }
  }
}
