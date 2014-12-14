/*jslint node: true */ 
'use strict';

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB

var sp = new SerialPort(process.env.LOCALSERIALPORT, {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
});

sp.open(function (error) {
    if ( error ) {
	console.log('Failed to open serial port: ' + error);
    } else {
	console.log('Serial port open: ' + sp.path);
    }
});

sp.on("data", function (data) {
    console.log(data);
});

// TODO
// make this into a module by exporting things
exports.poll = function(){
    //write some code here I guess
};
// make a function for opening a port
// what if the counter polling function could take requests for either run or hit, and stream the hits until the run request was complete?
// make a functoin for sending something in and getting back a request
// what about prototypes, objects, constructors, and closures to make it all cool


// how do I make these the right kinds of functions and how do I expose them
