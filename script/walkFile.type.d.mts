export type $Entry = {
  dirname: string;
  filepath: string;
  filename: string;
  cwd: string;
  relative: string;
};

export type $WalkOptions = {
  cwd?: string;
  depth?: number;
};
