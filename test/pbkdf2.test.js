var assert = require('assert')
var terst = require('terst')
var pbkdf2 = require('../')

var fixtures = require('./fixtures/pbkdf2')

describe('pbkdf2', function() {

  fixtures.valid.forEach(function(f) {
    it('should compute ' + f.description, function() {
      if (f.skip) return //skip the one with high # iterations
      var key = f.key
      var salt = f.salt

      if (f.type) {
        key = new Buffer(f.key, f.type)
        salt = new Buffer(f.salt, f.type)
      }

      var res = pbkdf2(key, salt, f.iterations, f.keylen)
      EQ (res.toString('hex'), f.result)
    })
  })
})

