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
    });
  };

  let fileContent = '';
  try {
    fileContent = formatCode(tree.read(entry.filepath));
  } catch (err) {
    console.error(err.codeFrame ?? err);
    process.exit(1);
  }
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
  // console.log('filepath', entry.filepath);

  fileContent = fileContent.replace(
    /from '([^']+)'/g,
    (_, from, index, content) => {
      /// ??????????????????????????? // ?????? * ?????????????????????????????????
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
        } else {
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
  /// ??? ????????? ?????????????????? mjs ?????????
  for (const [packageName, task] of tasks) {
    alertnative_libs.set(
      packageName,
      path.resolve(task.to_source_dir, 'index.mjs'),
    );
  }

  /**
   * ????????????
   */
  const unknown_pkg_recoder = new FileRecorder();
  /**
   * ??????????????????
   */
  const tree = new Tree();

  /// ??????????????????
  for (const [packageName, task] of tasks) {
    // ??????DEST
    fs.rmSync(task.to_source_dir, { recursive: true, force: true });
    /// ?????????????????????
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
  /// ??????????????????
  if (
    false ===
    unknown_pkg_recoder.print((log) => {
      tree.write(path.resolve(process.cwd(), `.miss/log.log`), log);
    })
  ) {
    console.log(chalk.green(`migrate successed ???`));
  }

  // ????????????
  tree.save();
};
