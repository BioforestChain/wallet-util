export { Psbt } from '../../assets/bip174/index.cjs';

import converter_varint_cjs from '../../assets/bip174/src/lib/converter/varint.cjs';
export const converter_varint = converter_varint_cjs;

export type {
  Bip32Derivation,
  KeyValue,
  PartialSig,
  PsbtGlobalUpdate,
  PsbtInput,
  PsbtInputUpdate,
  PsbtOutput,
  PsbtOutputUpdate,
  Transaction,
  TransactionFromBuffer,
} from '../../assets/bip174/src/lib/interfaces.cjs';

export {
  checkForInput,
  checkForOutput,
} from '../../assets/bip174/src/lib/utils.cjs';
