var MD5 = require('../md5.js/index.cjs');

module.exports = function (buffer) {
  return new MD5().update(buffer).digest();
};
