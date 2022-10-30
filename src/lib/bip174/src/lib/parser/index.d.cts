import { PsbtGlobal, PsbtInput, PsbtOutput } from '../interfaces.cjs';
export * from './fromBuffer.cjs';
export * from './toBuffer.cjs';
export interface PsbtAttributes {
  globalMap: PsbtGlobal;
  inputs: PsbtInput[];
  outputs: PsbtOutput[];
}
