const http = require('http');
const module1 = require('./module1');
const module2 = require('./module2');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(module2.myVariable);
  module2.myFunction();
  res.end();
}).listen(8000);

console.log('Server Running On 8000');
