'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../../typeFields.js');
const tools_1 = require('../tools.js');
const varuint = require('../varint.js');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.InputTypes.WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode witnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const value = tools_1.readUInt64LE(keyVal.value, 0);
  let _offset = 8;
  const scriptLen = varuint.decode(keyVal.value, _offset);
  _offset += varuint.encodingLength(scriptLen);
  const script = keyVal.value.slice(_offset);
  if (script.length !== scriptLen) {
    throw new Error('Decode Error: WITNESS_UTXO script is not proper length');
  }
  return {
    script,
    value,
  };
}
exports.decode = decode;
function encode(data) {
  const { script, value } = data;
  const varintLen = varuint.encodingLength(script.length);
  //@ts-ignore
  const result = Buffer.allocUnsafe(8 + varintLen + script.length);
  tools_1.writeUInt64LE(result, value, 0);
  varuint.encode(script.length, result, 8);
  script.copy(result, 8 + varintLen);
  return {
    //@ts-ignore
    key: Buffer.from([typeFields_1.InputTypes.WITNESS_UTXO]),
    value: result,
  };
}
exports.encode = encode;
exports.expected = '{ script: Buffer; value: number; }';
function check(data) {
  //@ts-ignore
  return Buffer.isBuffer(data.script) && typeof data.value === 'number';
}
exports.check = check;
function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.witnessUtxo === undefined;
}
exports.canAdd = canAdd;
