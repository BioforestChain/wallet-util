/// <reference types="node" />
export declare function base(ALPHABET: string): base.BaseConverter;
declare namespace base {
  interface BaseConverter {
    encode(buffer: Buffer | number[] | Uint8Array): string;
    decodeUnsafe(string: string): Buffer | undefined;
    decode(string: string): Buffer;
  }
}
