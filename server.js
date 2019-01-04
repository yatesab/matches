const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Test');
  res.end();
}).listen(8000);

console.log('Server Running On 8000');
