/**
 *
 * @param {string} base
 * @returns {(path:string)=>string}
 */
export const createResolveTo = (base) => (path) =>
  fileURLToPath(new URL(path, base));
