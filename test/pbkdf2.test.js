var assert = require('assert')
var pbkdf2 = require('../')

var fixtures = require('./fixtures/pbkdf2')

describe('pbkdf2', function() {

  describe('> when valid', function() {
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
        assert.equal(res.toString('hex'), f.result)
      })
    })
  })

  describe('> when invalid', function() {
    fixtures.invalid.forEach(function(f) {
      it('should throw ' + f.description, function() {
        assert.throws(function() {
          var res = pbkdf2(f.key, f.salt, f.iterations, f.keylen)
        }, new RegExp(f.description, 'i'))
      })
    })
  })
})

