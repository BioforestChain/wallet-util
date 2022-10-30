/// <reference types="node" />
import { KeyValue } from '../../interfaces.cjs';
export declare function makeChecker(
  pubkeyTypes: number[]
): (keyVal: KeyValue) => Buffer | undefined;
