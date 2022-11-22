'use strict';

// Wordlists
// See: https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md

// Browser; only include English by default

import { Wordlist } from './wordlist.mjs';

import { langEn as en } from './lang-en.mjs';

export const wordlists: { [locale: string]: Wordlist } = {
  en: en,
};
