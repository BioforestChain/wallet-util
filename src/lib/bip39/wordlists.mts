import type { $Language, $WordList } from './wordlists/_types.mjs';
export * from './wordlists/_types.mjs';

export const getWordList = async (language: $Language) => {
  switch (language) {
    case 'chinese_simplified':
      return (await import('./wordlists/chinese_simplified.mjs')).default;
    case 'chinese_traditional':
      return (await import('./wordlists/chinese_traditional.mjs')).default;
    case 'czech':
      return (await import('./wordlists/czech.mjs')).default;
    case 'english':
      // case 'EN':
      return (await import('./wordlists/english.mjs')).default;
    case 'french':
      return (await import('./wordlists/french.mjs')).default;
    case 'italian':
      return (await import('./wordlists/italian.mjs')).default;
    case 'japanese':
      // case 'JA':
      return (await import('./wordlists/japanese.mjs')).default;
    case 'korean':
      return (await import('./wordlists/korean.mjs')).default;
    case 'portuguese':
      return (await import('./wordlists/portuguese.mjs')).default;
    case 'spanish':
      return (await import('./wordlists/spanish.mjs')).default;
  }
  throw new Error(`unsupport language: ${language}`);
};

const WORDLISTS_MAP = new Map<$Language, $WordList>();

let DEFAULT_WORDLIST: $WordList | undefined;

export function setDefaultWordlist(
  language: $Language,
  wordlist?: $WordList,
): void {
  if (wordlist === undefined) {
    wordlist = WORDLISTS_MAP.get(language);
  }
  if (wordlist === undefined) {
    throw new Error(
      `need load wordList first, call \`await getWordList('${language}')\`.`,
    );
  }
  // void getWordList(language);
  DEFAULT_WORDLIST = wordlist;
}

export function getDefaultWordlist() {
  if (!DEFAULT_WORDLIST) {
    throw new Error('No Default Wordlist set.');
  }
  for (const [language, wordList] of WORDLISTS_MAP) {
    if (wordList[0] === DEFAULT_WORDLIST[0]) {
      return { language, wordList };
    }
  }
  throw new Error('Invalid Default Wordlist.');
}
