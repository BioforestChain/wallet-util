// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { FileRecorder } from './FileRecorder.mjs';
import { ALERTNATIVE_LIBS } from './migrate-alertnative.mjs';
import { createResolveTo, posixRelative } from './resolveTo.mjs';
import { Tree } from './tree.mjs';
import { walkDir } from './walkFile.mjs';
import { format } from './format.mjs';
import chalk from 'chalk';
import { indexToLine } from './index_to_line.mjs';
const resolveTo = createResolveTo(import.meta.url);
const prettierConfig = JSON.parse(
  fs.readFileSync(resolveTo('../.prettierrc'), 'utf-8'),
);

/**
 *
 * @param {(path:string)=>string} destResolveTo
 * @param {string} packageName
 * @param {import("./walkFile.type.mjs").$Entry} entry
 * @param {Map<string,string>} alertnative_libs
 * @param {import('./tree.mjs'). Tree} tree
 * @param {import("./FileRecorder.mjs").FileRecorder} unknown_pkg_recoder
 * @param {import("./migrate.type.mjs").$MigrateHook} hook
 */
export const migrateFile = (
  destResolveTo,
  packageName,
  entry,
  alertnative_libs,
  tree,
  unknown_pkg_recoder,
  hook,
) => {
  const dest_filepath = destResolveTo(`${entry.relative}`).replace(
    /\.ts$/,
    '.mts',
  );
  const dest_dirname = path.dirname(dest_filepath);
  fs.mkdirSync(dest_dirname, { recursive: true });
  const ext = path.extname(entry.filepath);
  const parserMap = {
    '.ts': 'typescript',
    '.mts': 'typescript',
    '.json': 'json',
  };
  const formatCode = (code) => {
    return format(code, {
      parser: parserMap[ext],
      ...prettierConfig,
    });
  };

  let fileContent = tree.read(entry.filepath);

  /* hook read content */
  if (hook.readContent) {
    const hookReadContentResult = hook.readContent({
      fileEntry: entry,
      fileContent,
      packageName,
      tree,
    });
    if (typeof hookReadContentResult === 'string') {
      fileContent = hookReadContentResult;
    } else if (hookReadContentResult === 0 /* DELETE */) {
      return;
    }
  }

  /// format
  try {
    fileContent = formatCode(fileContent);
  } catch (err) {
    console.error(err.codeFrame ?? err);
    process.exit(1);
  }

  /// process import/export from *
  fileContent = fileContent.replace(
    /from '([^']+)'/g,
    (_, from, index, content) => {
      /// 如果这一行的开头是 // 或者 * 应该属于注释，直接跳过
      if (
        /^(\/\/|\*)/.test(indexToLine(content, index).lineContent.trimStart())
      ) {
        return _;
      }
      // console.log('from', from);
      const alertnative = alertnative_libs.get(from);
      if (alertnative) {
        from = posixRelative(dest_dirname, alertnative);
      } else if (from.startsWith('.')) {
        const from_path = path.resolve(entry.dirname, from);
        if (fs.existsSync(from_path)) {
          if (fs.statSync(from_path).isDirectory()) {
            from += '/index.mjs';
          }
        }
        /// from 'name.js' => from 'name.mjs'
        else if (
          from.endsWith('.js') &&
          fs.existsSync(from_path.replace(/\.js$/, '.ts'))
        ) {
          from = from.replace(/js$/, 'mjs');
        }
        /// from 'name' => from 'name.mjs'
        else {
          from += '.mjs';
        }
        const new_from_path = path.resolve(entry.dirname, from);
        if (fs.existsSync(new_from_path.replace(/\.mjs$/, '.ts')) === false) {
          unknown_pkg_recoder.record(
            pathToFileURL(new_from_path).href,
            dest_filepath,
            content,
            index,
          );
        }
      } else {
        unknown_pkg_recoder.record(from, dest_filepath, content, index);
      }

      /* hook write from */
      if (hook.writeFrom) {
        const hookWriteFromResult = hook.writeFrom({
          fromSpecifier: from,
          sync: true,
          startIndex: index,

          fileEntry: entry,
          fileContent,
          packageName,
          tree,
        });
        if (typeof hookWriteFromResult === 'string') {
          from = hookWriteFromResult;
        }
      }

      return `from '${from}'`;
    },
  );

  /* hook write content */
  if (hook.writeContent) {
    const hookWriteContentResult = hook.writeContent({
      fileEntry: entry,
      fileContent,
      packageName,
      tree,
    });
    if (typeof hookWriteContentResult === 'string') {
      fileContent = hookWriteContentResult;
    } else if (hookWriteContentResult === 0 /* DELETE */) {
      return;
    }
  }
  tree.write(dest_filepath, formatCode(fileContent));
};

/**
 *
 * @param {import("./migrate.type.mjs").$MigrateTasks} tasks
 * @param {Map<string,string> =} alertnative_libs
 * @param {import("./migrate.type.mjs").$MigrateHook =} hook
 */
export const migratePackages = async (
  tasks,
  alertnative_libs = ALERTNATIVE_LIBS,
  hook = {},
) => {
  /// 将 兄弟包 的包转成内部 mjs 的风格
  for (const [packageName, task] of tasks) {
    alertnative_libs.set(
      packageName,
      path.resolve(task.to_source_dir, 'index.mjs'),
    );
  }

  /**
   * 未知的包
   */
  const unknown_pkg_recoder = new FileRecorder();
  /**
   * 文件读写工具
   */
  const tree = new Tree();

  /// 开始迁移工作
  for (const [packageName, task] of tasks) {
    console.log(chalk.green('migrating'), packageName);
    // 清空DEST
    fs.rmSync(task.to_source_dir, { recursive: true, force: true });
    /// 开始遍历源文件
    for (const entry of walkDir(task.from_source_dir)) {
      const destResolveTo = createResolveTo(task.to_source_dir + '/');
      migrateFile(
        destResolveTo,
        packageName,
        entry,
        alertnative_libs,
        tree,
        unknown_pkg_recoder,
        hook,
      );
    }
  }
  /// 打印未知的包
  if (
    false ===
    unknown_pkg_recoder.print((log) => {
      tree.write(path.resolve(process.cwd(), `.miss/log.log`), log);
    })
  ) {
    console.log(chalk.green(`migrate successed ✔`));
  }

  // 保存写入
  tree.save();
};
