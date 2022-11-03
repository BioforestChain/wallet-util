export function assert(condition: boolean, message: string): asserts condition {
  if (false === condition) {
    throw new Error(message);
  }
}

export function binaryToByte(bin: string) {
  return parseInt(bin, 2);
}

export function bytesToBinary(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((x) => x.toString(2).padStart(8, '0'))
    .join('');
}

export const cacheCall = <
  ARGS extends unknown[],
  R extends unknown /* NonNullable */,
>(
  fun: (...args: ARGS) => R,
) => {
  let r: R | undefined;
  return (...args: ARGS) => (r ??= fun(...args));
};
