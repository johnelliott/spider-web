/*jslint node: true */
'use strict';

// App
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var config = require('./config');
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 8001;
var app = express();

// Sockets with Axon
// var axon = require('axon');
// var sock = axon.socket('pub');
// sock.bind(3000);
// console.log('pub server started');

// Sockets with Faye
var http = require('http'),
    faye = require('faye');

var bayeux = new faye.NodeAdapter({mount: '/hits', timeout: 45});

// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, non-Bayeux request\n");
});

bayeux.attach(server);
server.listen(3001);
console.log('Faye listening on port 3001');

// Serial port
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB
// Instantiate a serial port
var sp = new SerialPort(localSerialPort, {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
});
// Open serial connection
sp.open(function (error) {
    if ( error ) {
    console.log('Failed to open serial port: ' + error);
    } else {
    console.log('Serial port open: ' + sp.path);
    }
});
// Create data structure
var hits = [];
sp.on("data", function (data) {
    console.log("Node local: " + data);
    hits.push(data);
    // Send data via faye
    bayeux.getClient().publish('/hits', data);
    // sock.send(JSON.parse(data)); // Axon send
});

// expect to receive json and parse if it checks out
app.use(bodyParser.json());

// routes
app.get('/', function(req, res){
    // send the first hit or just send done
    hits.length ? res.status(200).send(hits.shift()) : res.send('\ndone\n');
});

// Listen on port 8000
app.listen(port, function(){
    console.log("Express listening on port %d", port);
});
