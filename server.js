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
	// poll drone every few seconds and send signal updates
	var droneSignalPoller = setInterval(drone.signalStrength, 7*1000, function(err, rssi) {
		if(err) {
			return err;
		}
		// emit drone data update on the callback exec
		else {
			console.log("polled RSSI about to emit", rssi);
			drones.emit("data", {signalStrength: rssi});
		}
	});
	socket.on("disconnect", function(){
		console.log("socket disconnect");
		// kill the signal polling timer on drone disconnect
		clearInterval(droneSignalPoller);
		drone.land();
	});
	drone.connect();
	drones.emit("data", {
		// TODO: get UUID from an actual drone rather than what we use to
		// connect to is
		uuid: droneUUID,
		status: drone.status,
		flightOptions: drone.flightOptions
	});
	console.log('drone status', drone.status)

	// provide feedback to the front-end that commands came in
	socket.on("fly", function() {
		drone.fly();
		drones.emit("command", "fly received");
	});
	socket.on("faster", function() {
		drone.faster();
		drones.emit("command", "faster received");
		drones.emit("data", {flightOptions: drone.flightOptions});
	});
	socket.on("slower", function() {
		drone.slower();
		drones.emit("command", "slower received");
		drones.emit("data", {flightOptions: drone.flightOptions});
	});
	socket.on("longer", function() {
		drone.longer();
		drones.emit("command", "longer received");
		drones.emit("data", {flightOptions: drone.flightOptions});
	});
	socket.on("shorter", function() {
		drone.shorter();
		drones.emit("command", "shorter received");
		drones.emit("data", {flightOptions: drone.flightOptions});
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
