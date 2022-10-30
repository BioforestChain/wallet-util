import { KeyValue, PorCommitment } from '../../interfaces.cjs';
export declare function decode(keyVal: KeyValue): PorCommitment;
export declare function encode(data: PorCommitment): KeyValue;
export declare const expected = 'string';
export declare function check(data: any): data is PorCommitment;
export declare function canAdd(currentData: any, newData: any): boolean;
