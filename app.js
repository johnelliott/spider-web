var SocketServer = require("socket.io");
var Counter = require("./lib/serial");
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

// // logger
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
	socket.on("disconnect", function(){
		console.log("socket disconnect");
	});
});

try {
	var counter = new Counter(localSerialPort, function(data) {
		console.log("socket hit", data);
		app.socketServer.emit("hit", data);
	});
	if(!counter.isOpen()) {
		console.log("No counter connected");
		setInterval(function() {
			app.socketServer.emit("hit", "No counter connected " + new Date());
		}, 750);
	}
}
catch(err) {
	console.log("error connecting to counter on", localSerialPort, err);
}

if (require.main === module) {
	app.listen(port);
	app.socketServer.listen(sockPort);
}
else {
	module.exports = app;
}
