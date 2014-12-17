/*jslint node: true */
'use strict';

// App
var bodyParser = require('body-parser');
var _ = require('underscore');
var config = require('./config');
var sockPort = process.env.SOCKPORT || 8001

// Sockets with Faye
var http = require('http');
var faye = require('faye');

var bayeux = new faye.NodeAdapter({mount: '/hits', timeout: 45});

// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, non-Bayeux request\n");
});

bayeux.attach(server);
server.listen(3001);
console.log('Faye listening on port 3001');

var faketime =0;
setInterval(function(){
    faketime += 1.2;
    var message = '{"time":' + Math.floor(faketime) + ',"speed":' + Math.floor(Math.random()*30) + '}';
    console.log("Node local: " + message);
    bayeux.getClient().publish('/hits', message);
}, 1200);
