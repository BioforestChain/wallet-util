// @ts-check
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
/**
 *
 * @param {string} base
 * @returns {(path:string)=>string}
 */
export const createResolveTo = (base) => {
  if (base.startsWith('file:') === false) {
    base = pathToFileURL(base).href;
  }
  return (path) => fileURLToPath(new URL(path, base));
};
/**
 *
 * @param {string} from
 * @param {string} to
 */
export const posixRelative = (from, to) => {
  return path.relative(from, to).replace(/\\+/g, '/');
};
