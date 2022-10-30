/// <reference types="node" />
import * as globalXpub from './global/globalXpub.cjs';
import * as unsignedTx from './global/unsignedTx.cjs';
import * as finalScriptSig from './input/finalScriptSig.cjs';
import * as finalScriptWitness from './input/finalScriptWitness.cjs';
import * as nonWitnessUtxo from './input/nonWitnessUtxo.cjs';
import * as partialSig from './input/partialSig.cjs';
import * as porCommitment from './input/porCommitment.cjs';
import * as sighashType from './input/sighashType.cjs';
import * as tapKeySig from './input/tapKeySig.cjs';
import * as tapLeafScript from './input/tapLeafScript.cjs';
import * as tapMerkleRoot from './input/tapMerkleRoot.cjs';
import * as tapScriptSig from './input/tapScriptSig.cjs';
import * as witnessUtxo from './input/witnessUtxo.cjs';
import * as tapTree from './output/tapTree.cjs';
declare const globals: {
  unsignedTx: typeof unsignedTx;
  globalXpub: typeof globalXpub;
  checkPubkey: (
    keyVal: import('../interfaces.cjs').KeyValue
  ) => Buffer | undefined;
};
declare const inputs: {
  nonWitnessUtxo: typeof nonWitnessUtxo;
  partialSig: typeof partialSig;
  sighashType: typeof sighashType;
  finalScriptSig: typeof finalScriptSig;
  finalScriptWitness: typeof finalScriptWitness;
  porCommitment: typeof porCommitment;
  witnessUtxo: typeof witnessUtxo;
  bip32Derivation: {
    decode: (
      keyVal: import('../interfaces.cjs').KeyValue
    ) => import('../interfaces.cjs').Bip32Derivation;
    encode: (
      data: import('../interfaces.cjs').Bip32Derivation
    ) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is import('../interfaces.cjs').Bip32Derivation;
    expected: string;
    canAddToArray: (
      array: import('../interfaces.cjs').Bip32Derivation[],
      item: import('../interfaces.cjs').Bip32Derivation,
      dupeSet: Set<string>
    ) => boolean;
  };
  redeemScript: {
    decode: (keyVal: import('../interfaces.cjs').KeyValue) => Buffer;
    encode: (data: Buffer) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is Buffer;
    expected: string;
    canAdd: (currentData: any, newData: any) => boolean;
  };
  witnessScript: {
    decode: (keyVal: import('../interfaces.cjs').KeyValue) => Buffer;
    encode: (data: Buffer) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is Buffer;
    expected: string;
    canAdd: (currentData: any, newData: any) => boolean;
  };
  checkPubkey: (
    keyVal: import('../interfaces.cjs').KeyValue
  ) => Buffer | undefined;
  tapKeySig: typeof tapKeySig;
  tapScriptSig: typeof tapScriptSig;
  tapLeafScript: typeof tapLeafScript;
  tapBip32Derivation: {
    decode: (
      keyVal: import('../interfaces.cjs').KeyValue
    ) => import('../interfaces.cjs').TapBip32Derivation;
    encode: (
      data: import('../interfaces.cjs').TapBip32Derivation
    ) => import('../interfaces.cjs').KeyValue;
    check: (
      data: any
    ) => data is import('../interfaces.cjs').TapBip32Derivation;
    expected: string;
    canAddToArray: (
      array: import('../interfaces.cjs').TapBip32Derivation[],
      item: import('../interfaces.cjs').TapBip32Derivation,
      dupeSet: Set<string>
    ) => boolean;
  };
  tapInternalKey: {
    decode: (keyVal: import('../interfaces.cjs').KeyValue) => Buffer;
    encode: (data: Buffer) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is Buffer;
    expected: string;
    canAdd: (currentData: any, newData: any) => boolean;
  };
  tapMerkleRoot: typeof tapMerkleRoot;
};
declare const outputs: {
  bip32Derivation: {
    decode: (
      keyVal: import('../interfaces.cjs').KeyValue
    ) => import('../interfaces.cjs').Bip32Derivation;
    encode: (
      data: import('../interfaces.cjs').Bip32Derivation
    ) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is import('../interfaces.cjs').Bip32Derivation;
    expected: string;
    canAddToArray: (
      array: import('../interfaces.cjs').Bip32Derivation[],
      item: import('../interfaces.cjs').Bip32Derivation,
      dupeSet: Set<string>
    ) => boolean;
  };
  redeemScript: {
    decode: (keyVal: import('../interfaces.cjs').KeyValue) => Buffer;
    encode: (data: Buffer) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is Buffer;
    expected: string;
    canAdd: (currentData: any, newData: any) => boolean;
  };
  witnessScript: {
    decode: (keyVal: import('../interfaces.cjs').KeyValue) => Buffer;
    encode: (data: Buffer) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is Buffer;
    expected: string;
    canAdd: (currentData: any, newData: any) => boolean;
  };
  checkPubkey: (
    keyVal: import('../interfaces.cjs').KeyValue
  ) => Buffer | undefined;
  tapBip32Derivation: {
    decode: (
      keyVal: import('../interfaces.cjs').KeyValue
    ) => import('../interfaces.cjs').TapBip32Derivation;
    encode: (
      data: import('../interfaces.cjs').TapBip32Derivation
    ) => import('../interfaces.cjs').KeyValue;
    check: (
      data: any
    ) => data is import('../interfaces.cjs').TapBip32Derivation;
    expected: string;
    canAddToArray: (
      array: import('../interfaces.cjs').TapBip32Derivation[],
      item: import('../interfaces.cjs').TapBip32Derivation,
      dupeSet: Set<string>
    ) => boolean;
  };
  tapTree: typeof tapTree;
  tapInternalKey: {
    decode: (keyVal: import('../interfaces.cjs').KeyValue) => Buffer;
    encode: (data: Buffer) => import('../interfaces.cjs').KeyValue;
    check: (data: any) => data is Buffer;
    expected: string;
    canAdd: (currentData: any, newData: any) => boolean;
  };
};
export { globals, inputs, outputs };
