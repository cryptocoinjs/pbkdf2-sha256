1.1.0 / 2014-12-11
------------------
- removed `browserify` and `crypto-browserify` from `devDependencies`

1.0.1 / 2014-06-09
------------------
- small readme update

1.0.0 / 2014-06-09
------------------
- moved tests to fixtures
- removed dev dep `terst` for `assert`
- removed semicolons per http://cryptocoinjs.com/about/contributing/#semicolons
- added `crypto-browserify` for `crypto` dev dep (use with Browserify)
- added TravisCI
- added Coveralls

0.1.1 /2014-02-18
-----------------
- fixed typo in `package.json` `main` field

0.1.0 / 2014-02-18
------------------
- replaced legacy `sha256` JavaScript module with Node.js `sha256` module (increased performance by more than 50%)
- changed types from arrays to Buffers
- added type checking for key and salt. Must be `string` or `Buffer`.
- added browser testing (via Makefile)

0.0.1 / 2014-02-17
------------------
- extracted from https://github.com/cheongwy/node-scrypt-js/blob/master/lib/pbkdf2.js
- fixed bug that didn't initialize hmac in loop, now passes all tests