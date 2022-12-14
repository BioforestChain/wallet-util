import { KeyValue, NonWitnessUtxo } from '../../interfaces.cjs';
export declare function decode(keyVal: KeyValue): NonWitnessUtxo;
export declare function encode(data: NonWitnessUtxo): KeyValue;
export declare const expected = 'Buffer';
export declare function check(data: any): data is NonWitnessUtxo;
export declare function canAdd(currentData: any, newData: any): boolean;
