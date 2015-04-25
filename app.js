/*jslint node: true */

// Dependencies
var http = require('http');
var faye = require('faye');
var serialport = require("serialport");
// Environment
var config = require('./config');
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 8001;
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB

// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, non-Bayeux request\n");
});
// Set up sockets server
var bayeux = new faye.NodeAdapter({mount: '/hits', timeout: 45});
bayeux.attach(server);
server.listen(process.env.LISTENERPORT);
console.log('Faye listening on port ' + process.env.LISTENERPORT);

// Create a serial port
var sp = new serialport.SerialPort(localSerialPort, {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
});
// Open serial connection
sp.open(function (error) {
    if ( error ) {
    console.log('Failed to open serial port: ' + error);
    }
    else {
    console.log('Serial port open: ' + sp.path);
    }
});
// Publish serial data
sp.on("data", function (data) {
    console.log("Faye publish: " + data);
    bayeux.getClient().publish('/hits', data);
});
