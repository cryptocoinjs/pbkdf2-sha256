pbkdf2-sha256
=============

`pbkdf2-sha256` is a JavaScript implementation of [PBKDF2](http://en.wikipedia.org/wiki/PBKDF2) using the SHA256 HMAC. It's fully compatible with Node.js and the browser (via Browserify).


Why?
----

This is useful for the [Scrypt](http://en.wikipedia.org/wiki/Scrypt) algorithm.

Why not just use the Node.js `pbkdf2` function? The Node.js `pbkdf2` function uses the `sha1` algorithm and not the `sha256` algorithm for its pseudorandom function. This will change when Node v0.12 is released. Until then, this is the next best option.



Usage
-----

### Installation

    npm install --save pbkdf2-sha256

### Example

```js
var pbkdf2 = require('pbkdf2-sha256');

var key = 'passwd';
var salt = new Buffer('salt');
var res = pbkdf2(key, salt, 1, 64);
console.log(res.toString('hex')) // => 55ac046e56e3089fec1691c22544b605f94185216dde0465e68b9d57c20dacbc49ca9cccf179b645991664b39d77ef317c71b845b1e30bd509112041d3a19783
```

### Bundling for the Browser

To use in the browser, clone the repo and then download [Browserify](https://github.com/substack/node-browserify):

    npm install -g browserify

run:

    browserify --standalone pbdkf2 < lib/pbkdf2.js > pbdkf2.bundle.js

then include `pbdkf2.bundle.js` in your `<script>` tag in your html. 


### Testing

If you want to test the algorithm, clone the git repo. Then run `npm install --development` to install all of the dependencies.

#### Node.js

run:

    make test-node

### Browser

run:

    make test-browser

after you're finished, you can kill the test browser server (test-browser.js) by running:

    make kill



Misc
----

### Alternative Implementations

- https://github.com/bitwiseshiftleft/sjcl/blob/master/core/pbkdf2.js (Stanford JavaScript Crypto Library)
- https://code.google.com/p/crypto-js/source/browse/tags/3.1.2/src/pbkdf2.js (CryptoJS)

Why didn't I use either one of these? They're not Node.js optimized. They also don't use native types, so they'll be slower in the browser.


### Credits

Based upon the following code https://github.com/cheongwy/node-scrypt-js/blob/master/lib/pbkdf2.js which is based upon https://github.com/wg/scrypt/blob/master/src/main/java/com/lambdaworks/crypto/PBKDF.java



License
-------

MIT License

Copyright (c) 2014, JP Richardson
Copyright (c) 2010-2011 Intalio Pte, All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.