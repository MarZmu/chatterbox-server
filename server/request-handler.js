/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
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


  //declare the variables for the response variable (outgoing information)
  var message = 'Hello Kitty!';
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  //what type of method it is
  ////create a conditional statement for each

  var testJSON = JSON.stringify([
    {
      username: 'bobby', message: 'HEYY whats up'
    },
    {
      username: 'barbara', message: 'YOOOOO'
    }
  ]);
  var ourPaths = ['/classes/messages'];

  // console.log(testJSON, url, statusCode);

  //modify the variable values
  if (request.method === 'GET') {
    // get retrives data
    if (request.url.indexOf('classes/messages' !== -1)) {
      //if matching path and method (success)
      statusCode = 200;
      headers['Content-Type'] = 'application/json';
      message = testJSON;
    } else {
      //if wrong path (FAIL)
      statusCode = 404;
      message = 'Error: Path Not Found';
    }
  } else if (request.method === 'POST') {
    //if matching path and method (success)
    if (request.url.indexOf('classes/messages' !== -1)) {
      //identify path, and send the data there

      statusCode = 201;
      message = 'Your Post is Successful!';
    } else {
      //if wrong path (FAIL)
      statusCode = 404;
      message = '2Error: Path Not Found';
    }
  } else if (request.method === 'PUT') {
    // Updates the data


  } else if (request.method === 'DELETE') {
    // Delete the data

  } else if (request.method === 'OPTIONS') {
    // send back the methods we take
    // or any other information about the server

  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url + statusCode);



  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  //combine those variables into a response
  response.writeHead(statusCode, headers);

  // console.log(testJSON, statusCode);
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(message);


};

module.exports.requestHandler = requestHandler;
