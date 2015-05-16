/*jslint node: true */
var http = require('http');
var SocketServer = require('socket.io');
var sp = require("./lib/serial");
// env
var config = require('./config');
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 8001;
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB

// http server
var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Hello HTTP\n");
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

// console.log("localSerialPort", localSerialPort);
var counter = sp.connect(localSerialPort);

counter.on("data", function(data) {
	console.log("serial port data", data);
	socketServer.emit("hit", data);
});

server.listen(port);