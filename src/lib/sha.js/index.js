var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = require('./sha.js')
exports.sha1 = require('./sha1.js')
exports.sha224 = require('./sha224.js')
exports.sha256 = require('./sha256.js')
exports.sha384 = require('./sha384.js')
exports.sha512 = require('./sha512.js')
