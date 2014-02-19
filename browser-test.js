var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , browserify = require('browserify')

var html = [
  '<!DOCTYPE html>',
  '<meta charset="utf-8">',
  '<link rel="stylesheet" href="mocha.css" />',
  '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>',
  '<script src="mocha.js"></script>',
  '<script src="terst.js"></script>',
  '<script src="pbkdf2.js"></script>',
  '<script>mocha.setup("bdd")</script>',
  '<script src="pbkdf2.test.js"></script>',
  '<script>$(function () { mocha.run().globals(["pbkdf2"]) });</script>',
  '<div id="mocha"></div>'
].join('\n')

var server = http.createServer(function(req, res) {
  console.log(req.url);
  switch (req.url) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html); break;
    case '/mocha.js':
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      fs.createReadStream('./node_modules/mocha/mocha.js').pipe(res); break;
    case '/terst.js':
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      fs.createReadStream('./node_modules/terst/lib/terst.js').pipe(res); break;
    case '/mocha.css':
      res.writeHead(200, {'Content-Type': 'text/css'});
      fs.createReadStream('./node_modules/mocha/mocha.css').pipe(res); break;
    case '/pbkdf2.js':
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      //"standalone" must be named something other than 'pbkdf2' since 'pbkdf2' is our var in the test file
      browserify('./lib/pbkdf2.js').bundle({debug: true, standalone: 'prf'}).pipe(res); break;  
    case '/pbkdf2.test.js':
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      fs.createReadStream('./test/pbkdf2.test.js').pipe(res); break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end(req.url + ' not found.');
  }
});

server.listen(8080, function() {
  console.log('\n  listening on port 8080...');
});