var SocketServer = require("socket.io");
var sp = require("./lib/serial");
var koa = require("koa");
var server = require("koa-static");
// env
var config = require("./config");
var port = process.env.PORT || 8000;
var sockPort = process.env.SOCKPORT || 8001;
var localSerialPort = process.env.LOCALSERIALPORT || "/dev/ttyACM0"; // default to Ras. Pi USB

// koa server
var app = koa();
// logger
app.use(function*(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log("%s %s - %s", this.method, this.url, ms);
});
// static files
app.use(server("./public", {}));
// response
app.use(function*() {
  this.body = "Hello world from app";
});
app.listen(port);

// Socket.io sockets server
var socketServer = new SocketServer(app);
socketServer.on("connection", function(socket){
	socket.on("hit", function(data){
		console.log("socket hit event", data);
	});
	socket.on("disconnect", function(){
		console.log("socket disconnect event");
	});
});

var counter = sp.connect(localSerialPort);
counter.on("data", function(data) {
	console.log("serial port data", data);
	socketServer.emit("hit", data);
});
