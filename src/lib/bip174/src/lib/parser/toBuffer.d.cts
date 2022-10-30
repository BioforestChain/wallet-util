/// <reference types="node" />
import { KeyValue } from '../interfaces.cjs';
import { PsbtAttributes } from './index.cjs';
export declare function psbtToBuffer({
  globalMap,
  inputs,
  outputs,
}: PsbtAttributes): Buffer;
export declare function psbtToKeyVals({
  globalMap,
  inputs,
  outputs,
}: PsbtAttributes): {
  globalKeyVals: KeyValue[];
  inputKeyVals: KeyValue[][];
  outputKeyVals: KeyValue[][];
};
