var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = require('./sha.cjs')
exports.sha1 = require('./sha1.cjs')
exports.sha224 = require('./sha224.cjs')
exports.sha256 = require('./sha256.cjs')
exports.sha384 = require('./sha384.cjs')
exports.sha512 = require('./sha512.cjs')
