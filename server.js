var SocketServer = require("socket.io");
var Counter = require("./lib/serial");
var Drone = require("./lib/drone");
var RollingSpider = require("rolling-spider");


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
app.use(server("./app/public", {}));
// response
app.use(function*() {
	this.body = "Hello world from koa app server";
});

// Socket.io sockets server
app.socketServer = new SocketServer(app);
app.socketServer.on("connection", function(socket){
	console.log("something connected to app.socketServer");
	var drone = new Drone("RS_B181299");
	socket.on("disconnect", function(){
		console.log("socket disconnect");
		drone.land();
	});
	drone.connect();
	drone.signal();

	socket.on("fly", function() {
		drone.fly();
		app.socketServer.emit("data", "fly received");
	});
	socket.on("up", function() {
		drone.up();
		app.socketServer.emit("data", "up received");
	});
	socket.on("down", function() {
		drone.down();
		app.socketServer.emit("data", "down received");
	});
	socket.on("forward", function() {
		drone.forward();
		app.socketServer.emit("data", "forward received");
	});
	socket.on("back", function() {
		drone.back();
		app.socketServer.emit("data", "back received");
	});
	socket.on("left", function() {
		drone.left();
		app.socketServer.emit("data", "left received");
	});
	socket.on("right", function() {
		drone.right();
		app.socketServer.emit("data", "right received");
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
			app.socketServer.emit("hit", "No counter connected @" + new Date());
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
