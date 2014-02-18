var pbkdf2 = require('../lib/pbkdf2')

require('terst')

describe('+ pbkdf2', function() {
  //https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00 => 10. Test Vectors for PBKDF2 with HMAC-SHA-256
  describe('> when Scrypt Test Vectors', function() {
    describe('> when the first Scrypt test vectors are passed in', function() {
      it('should return the result', function() {
        var key = 'passwd'//= new Buffer('passwd');
        var salt = new Buffer('salt');

        var res = pbkdf2(key, salt, 1, 64);
        EQ (res.toString('hex'), '55ac046e56e3089fec1691c22544b605f94185216dde0465e68b9d57c20dacbc49ca9cccf179b645991664b39d77ef317c71b845b1e30bd509112041d3a19783');
      })
    })

    describe.skip('> when the second Scrypt test vectors are passed in', function() {
      it('should return the result', function() {
        var key = 'Password';
        var salt = new Buffer('NaCl');

        var res = pbkdf2(key, salt, 80000, 64);
        EQ (res.toString('hex'), '4ddcd8f60b98be21830cee5ef22701f9641a4418d04c0414aeff08876b34ab56a1d425a1225833549adb841b51c9b3176a272bdebba1d078478f62b397f33c8d');
      })
    })
  })

  //http://stackoverflow.com/questions/5130513/pbkdf2-hmac-sha2-test-vectors/5136918#5136918
  describe('> when Stack Overflow Test Vectors', function() {
    it('#1', function() {
      var key = 'password';
      var salt = new Buffer('salt');
      var res = pbkdf2(key, salt, 1, 32);
      EQ (res.toString('hex'), '120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b');
    })

    it('#2', function() {
      var key = 'password';
      var salt = new Buffer('salt');
      var res = pbkdf2(key, salt, 2, 32);
      EQ (res.toString('hex'), 'ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43');
    })

    it('#3', function() {
      var key = 'password';
      var salt = new Buffer('salt');
      var res = pbkdf2(key, salt, 4096, 32);
      EQ (res.toString('hex'), 'c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a');
    })

    it.skip('#4', function() {
      var key = 'password';
      var salt = new Buffer('salt');
      var res = pbkdf2(key, salt, 16777216, 32);
      EQ (res.toString('hex'), 'cf81c66fe8cfc04d1f31ecb65dab4089f7f179e89b3b0bcb17ad10e3ac6eba46');
    })

    it('#5', function() {
      var key = 'passwordPASSWORDpassword';
      var salt = new Buffer('saltSALTsaltSALTsaltSALTsaltSALTsalt');
      var res = pbkdf2(key, salt, 4096, 40);
      EQ (res.toString('hex'), '348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c4e2a1fb8dd53e1c635518c7dac47e9');
    })

    it('#6', function() {
      var key = "pass\0word";
      var salt = new Buffer("sa\0lt");
      var res = pbkdf2(key, salt, 4096, 16);
      EQ (res.toString('hex'), '89b69d0516f829893c696226650a8687');
    })    
  })
})

