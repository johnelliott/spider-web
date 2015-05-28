// serial port
var SerialPort = require("serialport");

// Create a serial port that handles data callbacks;
// don't open it yet
module.exports = function(port, callback) {
	var sp = new SerialPort.SerialPort(port, {
		parser: SerialPort.parsers.readline("\n"),
		baudrate: 9600
	}, false);

	// Open serial connection
	sp.open(function (err) {
		if(err) {
			console.log("Failed to open serial port", err);
		}
		else {
			console.log("Serial port open", sp.path);
			sp.on("data", function(data) {
				console.log("serial port data", data);
				callback(data);
			});

		}
	});

	return sp;
};
