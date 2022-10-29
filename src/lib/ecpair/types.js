'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.maybe =
  exports.Boolean =
  exports.Array =
  exports.Buffer256bit =
  exports.Network =
  exports.typeforce =
    void 0;
exports.typeforce = require('../typeforce/index.js');
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
exports.Array = exports.typeforce.Array;
//@ts-ignore
exports.Boolean = exports.typeforce.Boolean; // tslint:disable-line variable-name
//@ts-ignore
exports.maybe = exports.typeforce.maybe;
