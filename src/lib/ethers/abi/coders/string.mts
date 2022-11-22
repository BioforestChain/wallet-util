'use strict';

import { toUtf8Bytes, toUtf8String } from '../../strings/index.mjs';

import { Reader, Writer } from './abstract-coder.mjs';
import { DynamicBytesCoder } from './bytes.mjs';

export class StringCoder extends DynamicBytesCoder {
  constructor(localName: string) {
    super('string', localName);
  }

  defaultValue(): string {
    return '';
  }

  encode(writer: Writer, value: any): number {
    return super.encode(writer, toUtf8Bytes(value));
  }

  decode(reader: Reader): any {
    return toUtf8String(super.decode(reader));
  }
}
