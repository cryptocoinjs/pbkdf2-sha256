
var crypto = require("crypto");

function pbkdf2(key, salt, iterations, dkLen) {
  var hLen = 32; //SHA256 Mac length
  if (dkLen > (Math.pow(2, 32) - 1) * hLen) 
    throw Error("Requested key length too long");
  
  var DK = new Buffer(dkLen);

  var U = new Buffer(hLen);
  var T = new Buffer(hLen);
  var block1 = new Buffer(salt.length + 4);

  var l = Math.ceil(dkLen / hLen);
  var r = dkLen - (l - 1) * hLen;

  salt.copy(block1, 0, 0, salt.length);
  for (var i = 1; i <= l; i++) {
    block1[salt.length + 0] = (i >> 24 & 0xff);
    block1[salt.length + 1] = (i >> 16 & 0xff);
    block1[salt.length + 2] = (i >> 8  & 0xff);
    block1[salt.length + 3] = (i >> 0  & 0xff);

    U = crypto.createHmac('sha256', key).update(block1).digest();
    //U = bufferToArray(bufU);
    
    U.copy(T, 0, 0, hLen);

    for (var j = 1; j < iterations; j++) {
      U = crypto.createHmac('sha256', key).update(U).digest();
      //U = bufferToArray(bufU);

      for (var k = 0; k < hLen; k++) {
        T[k] ^= U[k];
      }
    }

    var destPos = (i - 1) * hLen;
    var len = (i == l ? r : hLen)
    T.copy(DK, destPos, 0, len);
  }

  //return new Buffer(DK)
  return DK;
}

//temporary
function bufferToArray(buf) { 
  return Array.prototype.slice.call(buf, 0)
}

module.exports = pbkdf2;