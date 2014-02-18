
var crypto = require("crypto");

function pbkdf2(key, salt, iterations, dkLen) {
  var DK = [];
  var hLen = 32; //SHA256 Mac length
    
  if (dkLen > (Math.pow(2, 32) - 1) * hLen) {
      throw Error("Requested key length too long");
  }

  var U      = [];
  var T      = [];
  var block1 = [];

  var l = Math.ceil(dkLen / hLen);
  var r = dkLen - (l - 1) * hLen;

  arraycopy(salt, 0, block1, 0, salt.length);
  for (var i = 1; i <= l; i++) {
    block1[salt.length + 0] = (i >> 24 & 0xff);
    block1[salt.length + 1] = (i >> 16 & 0xff);
    block1[salt.length + 2] = (i >> 8  & 0xff);
    block1[salt.length + 3] = (i >> 0  & 0xff);

    var bufU = crypto.createHmac('sha256', key).update(new Buffer(block1)).digest();
    U = bufferToArray(bufU);
    
    arraycopy(U, 0, T, 0, hLen);

    for (var j = 1; j < iterations; j++) {
      bufU = crypto.createHmac('sha256', key).update(new Buffer(U)).digest();
      U = bufferToArray(bufU);

      for (var k = 0; k < hLen; k++) {
        T[k] ^= U[k];
      }
    }

    arraycopy(T, 0, DK, (i - 1) * hLen, (i == l ? r : hLen));
  }

  return new Buffer(DK)
}


function arraycopy(src, srcPos, dest, destPos, length) {
  while (length--){
    dest[destPos++] = src[srcPos++];
  }  
}

//temporary
function bufferToArray(buf) { 
  return Array.prototype.slice.call(buf, 0)
}

module.exports = pbkdf2;