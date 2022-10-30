/// <reference types="node" />
import { Network } from '../networks.cjs';
import { p2data as embed } from './embed.cjs';
import { p2ms } from './p2ms.cjs';
import { p2pk } from './p2pk.cjs';
import { p2pkh } from './p2pkh.cjs';
import { p2sh } from './p2sh.cjs';
import { p2wpkh } from './p2wpkh.cjs';
import { p2wsh } from './p2wsh.cjs';
export interface Payment {
  name?: string;
  network?: Network;
  output?: Buffer;
  data?: Buffer[];
  m?: number;
  n?: number;
  pubkeys?: Buffer[];
  input?: Buffer;
  signatures?: Buffer[];
  pubkey?: Buffer;
  signature?: Buffer;
  address?: string;
  hash?: Buffer;
  redeem?: Payment;
  witness?: Buffer[];
}
export declare type PaymentCreator = (
  a: Payment,
  opts?: PaymentOpts
) => Payment;
export declare type PaymentFunction = () => Payment;
export interface PaymentOpts {
  validate?: boolean;
  allowIncomplete?: boolean;
}
export declare type StackElement = Buffer | number;
export declare type Stack = StackElement[];
export declare type StackFunction = () => Stack;
export { embed, p2ms, p2pk, p2pkh, p2sh, p2wpkh, p2wsh };
