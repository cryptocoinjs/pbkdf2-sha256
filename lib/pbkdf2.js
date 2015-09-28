var assert = require('assert')
var crypto = require('crypto')

function pbkdf2(key, salt, iterations, dkLen) {
  var hLen = 32 //SHA256 Mac length
  assert(dkLen <= (Math.pow(2, 32) - 1) * hLen, 'requested key length too long')
  assert(typeof key == 'string' || Buffer.isBuffer(key), 'key must be a string or buffer')
  assert(typeof salt == 'string' || Buffer.isBuffer(salt), 'key must be a string or buffer')

  if (typeof key == 'string') key = new Buffer(key)
  if (typeof salt == 'string') salt = new Buffer(salt)

  var DK = new Buffer(dkLen)
  var T = new Buffer(hLen)
  var block1 = new Buffer(salt.length + 4)

  var l = Math.ceil(dkLen / hLen)
  var r = dkLen - (l - 1) * hLen

  salt.copy(block1, 0, 0, salt.length)
  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length)

    var U = crypto.createHmac('sha256', key).update(block1).digest()
    U.copy(T, 0, 0, hLen)

    for (var j = 1; j < iterations; j++) {
      U = crypto.createHmac('sha256', key).update(U).digest()

      for (var k = 0; k < hLen; k++) {
        T[k] ^= U[k]
      }
    }

    var destPos = (i - 1) * hLen
    var len = (i == l ? r : hLen)
    T.copy(DK, destPos, 0, len)
  }

  return DK
}

module.exports = pbkdf2
