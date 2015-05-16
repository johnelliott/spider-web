var serialport = require("serialport");

// Create a serial port
var sp = new serialport.SerialPort(localSerialPort, {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
});
// Open serial connection
sp.open(function (err) {
   if(err) {
        console.log('Failed to open serial port: ' + error);
    }
    else {
        console.log('Serial port open: ' + sp.path);
    }
});

exports.publish = sp.on("data", callback);
