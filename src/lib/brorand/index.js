/**
 * crypto.getRandomValues
 * @param {number} n
 * @returns
 */
export function rand(n) {
  var arr = new Uint8Array(n);
  self.crypto.getRandomValues(arr);
  return arr;
}
