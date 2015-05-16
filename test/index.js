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
	require("../app.js");
	it("should respond to http GET requests", function(done) {
		request.get("http://localhost:8000/", function(err, res, body) {
			if(err) {
				throw new Error(err);
			}
			body.should.equal("Hello world from index.html");
			done();
		});
	});
});

describe.skip("Sockets server", function() {
	var app = require("../app.js");
	it("should respond to socket requests", function() {
	   // TODO
	});
});
