// @ts-check
import { createResolveTo } from './resolveTo.mjs';
import { walkDir } from './walkFile.mjs';
import path from 'node:path';
import { Tree } from './tree.mjs';
import { indexToLine } from './index_to_line.mjs';

const resolveTo = createResolveTo(import.meta.url);
const tree = new Tree();

for (const { filepath, dirname } of walkDir(resolveTo('../src'))) {
  if (filepath.endsWith('.cjs') === false) {
    continue;
  }
  const fileContent = tree.read(filepath);
  const index = fileContent.match(/[^\w]Buffer[^\w]/)?.index;
  let need_inject = false;
  if (
    index !== undefined &&
    fileContent.includes('buffer/index.cjs') === false
  ) {
    const pos = indexToLine(fileContent, index);
    if (pos) {
      console.log(`${filepath}:${pos.line}:${pos.col}`);
      need_inject = true;
    }
  }

  if (need_inject) {
    const buffer_cjs_path = resolveTo(`../src/lib/buffer/index.cjs`);
    const require_buffer_path = path
      .relative(dirname, buffer_cjs_path)
      .replace(/\\+/g, '/');
    if (require_buffer_path !== 'index.cjs') {
      tree.write(
        filepath,
        `const { Buffer } = require('${require_buffer_path}'); // auto-inject!\n` +
          fileContent,
      );
    }
  }
}

tree.save();
