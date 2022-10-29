var MD5 = require('../md5.js/index.js')

module.exports = function (buffer) {
  //@ts-ignore
  return new MD5().update(buffer).digest()
}
