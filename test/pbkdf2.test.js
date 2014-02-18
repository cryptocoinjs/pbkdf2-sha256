var pbkdf2 = require('../lib/pbkdf2')

require('terst')

describe('+ pbkdf2', function() {
  //https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00 => 10. Test Vectors for PBKDF2 with HMAC-SHA-256
  describe('> when the first Scrypt test vectors are passed in', function() {
    it('should return the result', function() {
      var key = 'passwd'//= new Buffer('passwd');
      var salt = new Buffer('salt');

      var res = pbkdf2(key, salt, 1, 64);
      EQ (res.toString('hex'), '55ac046e56e3089fec1691c22544b605f94185216dde0465e68b9d57c20dacbc49ca9cccf179b645991664b39d77ef317c71b845b1e30bd509112041d3a19783');
    })
  })

  describe('> when the second Scrypt test vectors are passed in', function() {
    it('should return the result', function() {
      var key = 'Password'
      var salt = new Buffer('NaCl')

      var res = pbkdf2(key, salt, 80000, 64);
      EQ (res.toString('hex'), '4ddcd8f60b98be21830cee5ef22701f9641a4418d04c0414aeff08876b34ab56a1d425a1225833549adb841b51c9b3176a272bdebba1d078478f62b397f33c8d');
    })
  })
})