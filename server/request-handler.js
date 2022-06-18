/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

const fs = require('fs');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function (request, response) {
  //how were going to handle the request
  //declare variables for the request header (incoming information)
  var url = request.url;
  var path = request.path;
  var statusCode = 200;

  //declare the variables for the response variable (outgoing information)
  var message = 'Hello Kitty!';
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  //what type of method it is
  ////create a conditional statement for each

  var fakeDatabase = [];

  var stubMsg = {
    username: 'Jono',
    text: 'Do my bidding!'
  };
  fakeDatabase.push(stubMsg);
  // fakeDatabase.push(stubMsg);
  // console.log(`Serving ${ip} at ${port}, the request method is ${request.method} and the url is ${request.url}`);

  if (request.method === 'GET') {



    if (request.url === '/classes/messages') {


      headers['Content-Type'] = 'application/json';
      response.writeHead(200, headers);
      response.end(JSON.stringify(fakeDatabase));
      return;

    } else {


      //if wrong path (FAIL)
      message = 'Error: Path Not Found';
      response.writeHead(404, headers);
      response.end(JSON.stringify(message));
      return;
    }




  } else if (request.method === 'POST') {

    if (request.url === '/classes/messages') {

      headers['Content-Type'] = 'application/json';

      var data = '';
      request.on('data', chunk => { data += chunk; });

      response.writeHead(201, headers);
      fakeDatabase.push(data);
      request.on('end', () => {
        response.end(JSON.stringify(fakeDatabase));
      });

      // appendFile('../chatterBoxData.txt',   )
      return;

    } else {
      //if wrong path (FAIL)
      message = 'Error: Path Not Found';
      response.writeHead(404, headers);
      response.end(JSON.stringify(message));
      return;
    }

  } else if (request.method === 'OPTIONS') {
    if (request.url === '/classes/messages') {
      headers['Allow'] = 'GET, POST, OPTIONS';
      response.writeHead(200, headers);
      return;
    } else {
      //if wrong path (FAIL)
      message = 'Error: Path Not Found';
      response.writeHead(404, headers);
      response.end(message);
      return;
    }
  }
  request.end();
  response.writeHead(404, headers);
  response.end('Unknown url and method');



  // console.log('Serving request type ' + request.method + ' for url ' + request.url + ' statusCode: ' + statusCode);
};

module.exports.requestHandler = requestHandler;
