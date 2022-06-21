
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var fakeData = [];

var requestHandler = function(request, response) {
  //request info
  var type = request.method;
  var path = request.url;

  //response info
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';
  //Default status code is set up for Incorrct request info
  var statusCode = 404;
  var retBody = 'Error 404! Destination not found!';

  console.log('Serving request type ' + type + ' for url ' + path);

  if (type === 'GET') {
    if (path === '/classes/messages') {
      //set content type to JSON, stat code to 200
      statusCode = 200;
      headers['Content-Type'] = 'application/json';
      //change retVal to info (stringify first!)
      retBody = JSON.stringify(fakeData);
    }
  } else if (type === 'POST') {
    if (path === '/classes/messages') {
      var incoming = '';
      request.on('data', chunk => { incoming += chunk; });
      request.on('end', () => {
        retBody = incoming;
        statusCode = 201;
        incoming = JSON.parse(incoming);
        fakeData.push(incoming);
        headers['Content-Type'] = 'application/json';
        response.writeHead(statusCode, headers);
        response.end(retBody);
      });
      return;
    }
  } else if (type === 'PUT') {
  } else if (type === 'DELETE') {
  } else if (type === 'OPTIONS') {
    statusCode = 200;
    retBody = 'Allow: GET, POST, OPTIONS \nPaths: \'/classes/messages\'';
  }

  response.writeHead(statusCode, headers);
  response.end(retBody);
};

module.exports.requestHandler = requestHandler;

//on post - function on must use 'data' string for data event
//          but variable to house data does not have to match
//        - must house all actions including response/request
//          end data within the request on end block