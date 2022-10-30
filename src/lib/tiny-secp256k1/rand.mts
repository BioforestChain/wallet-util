import { randomBytes } from '../crypto.mjs';

function get4RandomBytes(): Uint8Array {
  return randomBytes(4);
}

// Only to be used to initialize the context for rust-secp256k1
export function generateInt32(): number {
  const array = get4RandomBytes();
  return (
    (array[0] << (3 * 8)) +
    (array[1] << (2 * 8)) +
    (array[2] << (1 * 8)) +
    array[3]
  );
}
