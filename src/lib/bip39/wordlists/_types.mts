export type $Language =
  //   | 'EN'
  //   | 'JA'
  //   | 'ZH-CN'
  | 'chinese_simplified'
  | 'chinese_traditional'
  | 'czech'
  | 'english'
  | 'french'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'portuguese'
  | 'spanish';

export type $WordList = string[];

export const ALL_LANGUAGE: $Language[] = [
  'english',
  'japanese',
  'chinese_simplified',
  'chinese_traditional',
  'czech',
  'french',
  'italian',
  'korean',
  'portuguese',
  'spanish',
];
