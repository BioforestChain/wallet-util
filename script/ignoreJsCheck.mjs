// @ts-check
import { createResolveTo } from './resolveTo.mjs';

import jsbuildinfo from '../dist/tsconfig.js.tsbuildinfo.json' assert { type: 'json' };
import { Tree } from './tree.mjs';

const resolveTo = createResolveTo(import.meta.url);
const resolveTo2 = createResolveTo(
  resolveTo('../dist/tsconfig.js.tsbuildinfo.json')
);
const tree = new Tree();

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
        const lastLine = errorBeforeContent.slice(lastLineIndex + 1);
        const lastLineSpaceWidth = lastLine.match(/^\s+/)?.[0].length ?? 0;
        if (lastLine.slice(lastLineSpaceWidth) === '* @param') {
          continue;
        }
        fileContent =
          errorBeforeContent.slice(0, lastLineIndex) +
          '\n' +
          ' '.repeat(lastLineSpaceWidth) +
          '//@ts-ignore' +
          errorBeforeContent.slice(lastLineIndex) +
          fileContent.slice(dig.start);
      }
      tree.write(filepath, fileContent);
    }
  }
}

tree.save();
