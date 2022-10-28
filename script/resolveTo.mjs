// @ts-check
import { fileURLToPath, pathToFileURL } from 'node:url';
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
