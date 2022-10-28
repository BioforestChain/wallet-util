'use strict'

var createHash = require('../create-hash/index.js')
var bs58checkBase = require('./base.js')

// SHA256(SHA256(buffer))
function sha256x2 (buffer) {
  var tmp = createHash('sha256').update(buffer).digest()
  return createHash('sha256').update(tmp).digest()
}

module.exports = bs58checkBase(sha256x2)
