import type { Tree } from './tree.mjs';
import type { $Entry } from './walkFile.type.mjs';

export type $MigrateTasks = Map<
  /* packageName */ string,
  {
    /* package/src  */
    from_source_dir: string;
    to_source_dir: string;
  }
>;

export type $MigrateHook = {
  readContent?: $HookContent;
  writeFrom?: $HookFrom;
  writeContent?: $HookContent;
};

export type $HookContent = (options: {
  fileEntry: $Entry;
  fileContent: string;
  packageName: string;
  tree: Tree;
}) => /* fileContent: */ string | undefined | MIGRATE_HOOK_CONTROL;
export type $HookFrom = (options: {
  fromSpecifier: string;
  sync: boolean;
  startIndex: number;

  fileEntry: $Entry;
  fileContent: string;
  packageName: string;
  tree: Tree;
}) => /* from: */ string | undefined;

export const enum MIGRATE_HOOK_CONTROL {
  DELETE = 0,
  //   SKIP = 1,
}
