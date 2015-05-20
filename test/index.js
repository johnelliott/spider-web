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

describe.only("Sockets server", function() {
	require("../app.js");
	// require socket.io-client
	var io = require("socket.io-client");
	it("should respond to socket requests", function() {
	   // TODO connect to a client
	   // io("localhost:8000/")
	});
});
