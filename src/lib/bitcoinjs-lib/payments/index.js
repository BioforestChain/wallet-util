'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
//@ts-ignore
exports.p2wsh = exports.p2wpkh = exports.p2sh = exports.p2pkh = exports.p2pk = exports.p2ms = exports.embed = void 0;
const embed_1 = require('./embed.js');
Object.defineProperty(exports, 'embed', {
  enumerable: true,
  get: function() {
    return embed_1.p2data;
  },
});
const p2ms_1 = require('./p2ms.js');
Object.defineProperty(exports, 'p2ms', {
  enumerable: true,
  get: function() {
    return p2ms_1.p2ms;
  },
});
const p2pk_1 = require('./p2pk.js');
Object.defineProperty(exports, 'p2pk', {
  enumerable: true,
  get: function() {
    return p2pk_1.p2pk;
  },
});
const p2pkh_1 = require('./p2pkh.js');
Object.defineProperty(exports, 'p2pkh', {
  enumerable: true,
  get: function() {
    return p2pkh_1.p2pkh;
  },
});
const p2sh_1 = require('./p2sh.js');
Object.defineProperty(exports, 'p2sh', {
  enumerable: true,
  get: function() {
    return p2sh_1.p2sh;
  },
});
const p2wpkh_1 = require('./p2wpkh.js');
Object.defineProperty(exports, 'p2wpkh', {
  enumerable: true,
  get: function() {
    return p2wpkh_1.p2wpkh;
  },
});
const p2wsh_1 = require('./p2wsh.js');
Object.defineProperty(exports, 'p2wsh', {
  enumerable: true,
  get: function() {
    return p2wsh_1.p2wsh;
  },
});
// TODO
// witness commitment
