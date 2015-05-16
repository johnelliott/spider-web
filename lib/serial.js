// serial port
var serialport = require("serialport");
// default to Ras. Pi USB
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; 

// Create a serial port
var sp = new serialport.SerialPort(localSerialPort, {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
});
// Open serial connection
sp.open(function (err) {
    if(err) {
        console.log('Failed to open serial port: ', err);
    }
    else {
        console.log('Serial port open: ', sp.path);
    }
});

exports.send = function(callback) {
    sp.on("data", callback(data));
};
