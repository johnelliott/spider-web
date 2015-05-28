var SocketServer = require("socket.io");
var sp = require("./lib/serial");
var koa = require("koa");
var server = require("koa-static");
// env
require("./config");
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 3000;
var localSerialPort = process.env.LOCALSERIALPORT
	|| "/dev/ttyACM0"; // default to Ras. Pi USB

// koa server
var app = koa();
// logger
// app.use(function*(next) {
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log("%s %s - %s", this.method, this.url, ms);
// });
// static files
app.use(server("./public", {}));
// response
app.use(function*() {
	this.body = "Hello world from app";
});

// Socket.io sockets server
app.socketServer = new SocketServer(app);
app.socketServer.on("connection", function(socket){
	console.log("something connected to app.socketServer");
	socket.on("hit", function(data){
		console.log("socket hit", data);
	});
	socket.on("disconnect", function(){
		console.log("socket disconnect");
	});
});

try {
	var counter = sp.connect(localSerialPort);
	counter.on("open", function() {
		console.log("serial port open");
		counter.on("data", function(data) {
			console.log("serial port data", data);
			// TODO make this a module 
			// that runs this line below as a callback
			app.socketServer.emit("hit", data);
		});
	});
}
catch(err) {
	console.log("error connecting to", localSerialPort, err);
}

if (require.main === module) {
	app.listen(port);
	// app.socketServer.listen(sockPort);
}
else {
	module.exports = app;
}
