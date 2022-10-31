type usize = number;
type i32 = number;
export type $Exports = {
  initializeContext: () => void;
  __data_end: WebAssembly.Global;
  __heap_base: WebAssembly.Global;
  memory: WebAssembly.Memory;

  EXTRA_DATA_INPUT: WebAssembly.Global;
  HASH_INPUT: WebAssembly.Global;

  isPoint: (inputlen: usize) => usize;
  pointAdd: (inputlen: usize, inputlen2: usize, outputlen: usize) => i32;
  pointAddScalar: (inputlen: usize, outputlen: usize) => i32;
  pointCompress: (inputlen: usize, outputlen: usize) => void;
  pointFromScalar: (outputlen: usize) => i32;
  pointMultiply: (inputlen: usize, outputlen: usize) => i32;

  PRIVATE_INPUT: WebAssembly.Global;
  privateAdd: () => i32;
  privateNegate: () => void;
  privateSub: () => i32;

  PUBLIC_KEY_INPUT: WebAssembly.Global;
  PUBLIC_KEY_INPUT2: WebAssembly.Global;
  recover: (outputlen: usize, recid: i32) => i32;
  sign: (extra_data: i32) => void;
  SIGNATURE_INPUT: WebAssembly.Global;
  signRecoverable: (extra_data: i32) => i32;
  signSchnorr: (extra_data: i32) => void;

  TWEAK_INPUT: WebAssembly.Global;
  verify: (inputlen: usize, strict: i32) => i32;
  verifySchnorr: () => i32;

  X_ONLY_PUBLIC_KEY_INPUT: WebAssembly.Global;
  X_ONLY_PUBLIC_KEY_INPUT2: WebAssembly.Global;
  xOnlyPointAddTweak: () => i32;
  xOnlyPointAddTweakCheck: (tweaked_parity: i32) => i32;
  xOnlyPointFromPoint: (inputlen: usize) => i32;
  xOnlyPointFromScalar: () => i32;
};

import { config } from '../assetLoader.mjs';
import { generateInt32 } from './rand.mjs';
import { throwError } from './validate_error.mjs';

export async function instantiateWasm() {
  const wasmUrl = `${config.wasmBaseUrl}/tiny-secp256k1/secp256k1.wasm`;
  const data = await config.wasmLoader(wasmUrl);
  const module = await WebAssembly.instantiate(data, {
    './validate_error.mjs': {
      throwError,
    },
    './rand.mjs': {
      generateInt32,
    },
  });
  return module.instance.exports as $Exports;
}
