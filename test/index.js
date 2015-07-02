var request = require("request");
var should = require("should");
require("./index");

describe("Server", function() {
	var server = require("../server.js");
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
	var server = require("../server.js");
	server.listen(8000);
	server.socketServer.listen(3000);

	// require socket.io-client
	var SocketClient = require("socket.io-client");

	it("should create a socket server to connect to", function(done) {
		var client = new SocketClient("http://localhost:3000/");
		client.on("connect", function() {
			done();
		});
	});
	// TODO do another test with this
	// server.socketServer.emit("hit", {message: "hello mocha"});
});
