/*jslint node: true */
var http = require('http');
var faye = require('faye');
var config = require('./config');
var sockPort = process.env.SOCKPORT || 8001;

var bayeux = new faye.NodeAdapter({mount: '/hits', timeout: 45});
// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, non-Bayeux request\n");
});
bayeux.attach(server);
server.listen(process.env.LISTENERPORT);
console.log('Faye listening on port ' + process.env.LISTENERPORT);

var faketime = 0;
var interval = 1750;
setInterval(function(){

    faketime += 2;
    var message = '{"time":' + Math.floor(faketime) + ',"speed":' + Math.floor(Math.random()*30) + '}';
    console.log("Talker: " + message);
    bayeux.getClient().publish('/hits', message);
}, interval);
