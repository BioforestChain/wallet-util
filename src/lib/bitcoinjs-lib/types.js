'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.oneOf = exports.Null = exports.BufferN = exports.Function = exports.UInt32 = exports.UInt8 = exports.tuple = exports.maybe = exports.Hex = exports.Buffer = exports.String = exports.Boolean = exports.Array = exports.Number = exports.Hash256bit = exports.Hash160bit = exports.Buffer256bit = exports.Network = exports.ECPoint = exports.Satoshi = exports.Signer = exports.BIP32Path = exports.UInt31 = exports.isPoint = exports.typeforce = void 0;
const buffer_1 = require('../buffer/index.js');
exports.typeforce = require('../typeforce/index.js');
const ZERO32 = buffer_1.Buffer.alloc(32, 0);
const EC_P = buffer_1.Buffer.from(
  'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f',
  'hex',
);
function isPoint(p) {
  if (!buffer_1.Buffer.isBuffer(p)) return false;
  if (p.length < 33) return false;
  const t = p[0];
  const x = p.slice(1, 33);
  if (x.compare(ZERO32) === 0) return false;
  if (x.compare(EC_P) >= 0) return false;
  if ((t === 0x02 || t === 0x03) && p.length === 33) {
    return true;
  }
  const y = p.slice(33);
  if (y.compare(ZERO32) === 0) return false;
  if (y.compare(EC_P) >= 0) return false;
  if (t === 0x04 && p.length === 65) return true;
  return false;
}
exports.isPoint = isPoint;
const UINT31_MAX = Math.pow(2, 31) - 1;
function UInt31(value) {
  //@ts-ignore
  return exports.typeforce.UInt32(value) && value <= UINT31_MAX;
}
exports.UInt31 = UInt31;
function BIP32Path(value) {
  return (
    //@ts-ignore
    exports.typeforce.String(value) && !!value.match(/^(m\/)?(\d+'?\/)*\d+'?$/)
  );
}
exports.BIP32Path = BIP32Path;
BIP32Path.toJSON = () => {
  return 'BIP32 derivation path';
};
function Signer(obj) {
  return (
    //@ts-ignore
    (exports.typeforce.Buffer(obj.publicKey) ||
      typeof obj.getPublicKey === 'function') &&
    typeof obj.sign === 'function'
  );
}
exports.Signer = Signer;
const SATOSHI_MAX = 21 * 1e14;
function Satoshi(value) {
  //@ts-ignore
  return exports.typeforce.UInt53(value) && value <= SATOSHI_MAX;
}
exports.Satoshi = Satoshi;
// external dependent types
//@ts-ignore
exports.ECPoint = exports.typeforce.quacksLike('Point');
// exposed, external API
exports.Network = exports.typeforce.compile({
  //@ts-ignore
  messagePrefix: exports.typeforce.oneOf(
    //@ts-ignore
    exports.typeforce.Buffer,
    //@ts-ignore
    exports.typeforce.String,
  ),
  bip32: {
    //@ts-ignore
    public: exports.typeforce.UInt32,
    //@ts-ignore
    private: exports.typeforce.UInt32,
  },
  //@ts-ignore
  pubKeyHash: exports.typeforce.UInt8,
  //@ts-ignore
  scriptHash: exports.typeforce.UInt8,
  //@ts-ignore
  wif: exports.typeforce.UInt8,
});
//@ts-ignore
exports.Buffer256bit = exports.typeforce.BufferN(32);
//@ts-ignore
exports.Hash160bit = exports.typeforce.BufferN(20);
//@ts-ignore
exports.Hash256bit = exports.typeforce.BufferN(32);
//@ts-ignore
exports.Number = exports.typeforce.Number; // tslint:disable-line variable-name
//@ts-ignore
exports.Array = exports.typeforce.Array;
//@ts-ignore
exports.Boolean = exports.typeforce.Boolean; // tslint:disable-line variable-name
//@ts-ignore
exports.String = exports.typeforce.String; // tslint:disable-line variable-name
//@ts-ignore
exports.Buffer = exports.typeforce.Buffer;
//@ts-ignore
exports.Hex = exports.typeforce.Hex;
//@ts-ignore
exports.maybe = exports.typeforce.maybe;
//@ts-ignore
exports.tuple = exports.typeforce.tuple;
//@ts-ignore
exports.UInt8 = exports.typeforce.UInt8;
//@ts-ignore
exports.UInt32 = exports.typeforce.UInt32;
//@ts-ignore
exports.Function = exports.typeforce.Function;
//@ts-ignore
exports.BufferN = exports.typeforce.BufferN;
//@ts-ignore
exports.Null = exports.typeforce.Null;
//@ts-ignore
exports.oneOf = exports.typeforce.oneOf;
