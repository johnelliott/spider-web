/*jslint node: true */

var http = require('http');
var SocketServer = require('socket.io');
// env
var config = require('./config');
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 8001;

// http server
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello HTTP\n");
});

// Socket.io sockets server
var socketServer = new SocketServer(server);
// socketServer(server);

socketServer.on('connection', function(socket){
  socket.on('hit', function(data){
    console.log("socket hit event", data);
  });
  socket.on('disconnect', function(){
    console.log("socket disconnect event");
  });
});

// modules
// var counter = require("./lib/serial");

// serial port
var serialport = require("serialport");
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB

// Create a serial port
var sp = new serialport.SerialPort(localSerialPort, {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
});
// Open serial connection
sp.open(function (err) {
    if(err) {
        console.log('Failed to open serial port', err);
    }
    else {
        console.log('Serial port open', sp.path);
    }
});

sp.on("data", function(data) {
    console.log("serial port data", data);
    socketServer.emit("hit", data);
});
