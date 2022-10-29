var typeforce = require('.//index.js')

function tfNoThrow (type, value, strict) {
  try {
    return typeforce(type, value, strict)
  } catch (e) {
    //@ts-ignore
    tfNoThrow.error = e
    return false
  }
}

module.exports = Object.assign(tfNoThrow, typeforce)
