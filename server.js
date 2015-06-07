var koa = require("koa");
var server = require("koa-static");
var SocketServer = require("socket.io");
var Drone = require("./lib/drone");

// env
require("./config");
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 3000;
var droneUUID = process.env.DRONE;

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

var drones = app.socketServer.of("/drones");
drones.on("connection", function(socket){
	console.log("something connected to /drones");
	var drone = new Drone(droneUUID);
	socket.on("disconnect", function(){
		console.log("socket disconnect");
		drone.land();
	});
	drone.connect();
	drone.signal();

	// provide feedback to the front-end that commands came in
	socket.on("fly", function() {
		drone.fly();
		drones.emit("command", "fly received");
	});
	socket.on("faster", function() {
		drone.faster();
		drones.emit("command", "faster received");
	});
	socket.on("slower", function() {
		drone.slower();
		drones.emit("command", "slower received");
	});
	socket.on("longer", function() {
		drone.longer();
		drones.emit("command", "longer received");
	});
	socket.on("shorter", function() {
		drone.shorter();
		drones.emit("command", "shorter received");
	});
	socket.on("turnRight", function() {
		drone.turnRight();
		drones.emit("command", "turnRight received");
	});
	socket.on("turnLeft", function() {
		drone.turnLeft();
		drones.emit("command", "turnLeft received");
	});
	socket.on("up", function() {
		drone.up();
		drones.emit("command", "up received");
	});
	socket.on("down", function() {
		drone.down();
		drones.emit("command", "down received");
	});
	socket.on("forward", function() {
		drone.forward();
		drones.emit("command", "forward received");
	});
	socket.on("back", function() {
		drone.back();
		drones.emit("command", "back received");
	});
	socket.on("left", function() {
		drone.left();
		drones.emit("command", "left received");
	});
	socket.on("right", function() {
		drone.right();
		drones.emit("command", "right received");
	});
	socket.on("flip", function() {
		drone.flip();
		drones.emit("command", "flip received");
	});
});

if (require.main === module) {
	app.listen(port);
	app.socketServer.listen(sockPort);
	console.log("server listening on port", port);
}
else {
	module.exports = app;
}
