/*server.js*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function handleRequest (request, response) {
  response.statusCode = 200;
  // response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World\n');
}

//This creates the server
const server = http.createServer(handleRequest);

function listenResponse (){
  console.log('Server running at http://'+ hostname + ':' + port + '/');
}

//This listens to a specific port and runs a fuction
server.listen(3000, hostname, listenResponse);
//test4