// @ts-check
import chalk from 'chalk';
import { indexToLine } from './index_to_line.mjs';
import { posixRelative } from './resolveTo.mjs';
import { format } from './format.mjs';

/**
 * 文件记录仪
 */

export class FileRecorder {
  /**
   * 最终记录信息
   * @type {Map<string,{filepath:string; line?: number; col?: number;}[]>}
   */
  data = new Map();
  /**
   * 记录文件
   * @param {string} key
   * @param {string} filepath
   * @param {string} fileContent
   * @param {number} index
   */
  record(key, filepath, fileContent, index) {
    let files = this.data.get(key);
    if (files === undefined) {
      files = [];
      this.data.set(key, files);
    }
    files.push({ filepath, ...indexToLine(fileContent, index) });
  }
  /**打印记录内容 */
  /**
   *
   * @param {(string)=>void=} output
   */
  print(output) {
    if (this.data.size === 0) {
      return false;
    }
    // console.log('unknown lib_packages:');

    const out = { text: '', h1: 0, h2: 0 };
    const cwd = process.cwd();
    for (const [key, files] of this.data) {
      console.group(chalk.cyan(key));
      out.text += `\n- [${key}](https://npmjs.org/package/${
        key.startsWith('file:')
          ? key
          : key.startsWith('@')
          ? key.split('/', 2).slice(0, 2).join('/')
          : key.split('/', 1)[0]
      })\n`;
      out.h2 = 0;
      for (const file of files) {
        const relative_filepath = posixRelative(cwd, file.filepath);
        console.log(
          chalk.blue(relative_filepath) +
            chalk.green(`:${file.line}:${file.col}`),
        );
        out.text += `  ${++out.h2}. ${file.filepath}:${file.line}:${
          file.col
        }\n`;
      }
      console.groupEnd();
    }

    output?.(format(out.text.trim(), { parser: 'markdown' }));
    return true;
  }
}
