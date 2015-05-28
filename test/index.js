var request = require("request");
var should = require("should");
require("./index");

describe("Serial", function() {
	var serial = require("../lib/serial");
	it("should return a connect function", function() {
		serial.connect.should.be.type("function");
	});
});

describe("Server", function() {
	var app = require("../app.js");
	it("should respond to http GET requests", function(done) {
		request.get("http://localhost:8000/", function(err, res, body) {
			if(err) {
				throw new Error(err);
			}
			body.should.be.type("string");
			body.search(/this/).should.be.type("number");
			done();
		});
	});
});

describe("Sockets server", function() {
	// bring in app and start it
	var app = require("../app.js");
	app.listen(8000);
	app.socketServer.listen(3000);

	// require socket.io-client
	var SocketClient = require("socket.io-client");

	it("should create a socket server to connect to", function(done) {
		var client = new SocketClient("http://localhost:3000/");
		client.on("connect", function() {
			done();
		});
	});
	// TODO do another test with this
	// app.socketServer.emit("hit", {message: "hello mocha"});
});
