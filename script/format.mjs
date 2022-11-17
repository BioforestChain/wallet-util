// @ts-check
import prettier from 'prettier';
import fs from 'node:fs';
import { createResolveTo } from './resolveTo.mjs';
const baseOptions = new Function(
  `return (${fs.readFileSync(
    createResolveTo(import.meta.url)('../.prettierrc'),
  )})`,
)();

/**
 *
 * @param {string} fileContent
 * @param {prettier.Options} options
 */
export const format = (fileContent, options) => {
  return prettier.format(fileContent, {
    ...baseOptions,
    ...options,
  });
};
