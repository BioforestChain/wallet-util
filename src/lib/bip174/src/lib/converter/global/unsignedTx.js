'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../../typeFields.js');
function encode(data) {
  return {
    //@ts-ignore
    key: Buffer.from([typeFields_1.GlobalTypes.UNSIGNED_TX]),
    value: data.toBuffer(),
  };
}
exports.encode = encode;
