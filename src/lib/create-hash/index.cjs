'use strict';
var inherits = require('../inherits/index.cjs');
var MD5 = require('../md5.js/index.cjs');
var RIPEMD160 = require('../ripemd160/index.cjs');
var sha = require('../sha.js/index.cjs');
var Base = require('../cipher-base/index.cjs');

function Hash(hash) {
  Base.call(this, 'digest');

  this._hash = hash;
}

inherits(Hash, Base);

Hash.prototype._update = function (data) {
  this._hash.update(data);
};

Hash.prototype._final = function () {
  return this._hash.digest();
};

module.exports = function createHash(alg) {
  alg = alg.toLowerCase();
  if (alg === 'md5') return new MD5();
  if (alg === 'rmd160' || alg === 'ripemd160') return new RIPEMD160();

  return new Hash(sha(alg));
};
