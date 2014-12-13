/*jslint node: true */ 
'use strict';

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/cu.usbmodem1421", {
    parser: serialport.parsers.raw,
    baudrate: 9600
});

sp.open(function (error) {
    if ( error ) {
	console.log('failed to open: '+error);
    } else {
	console.log('open');
    }
});

sp.on("data", function (data) {
    console.log("sp: "+data);
});



// TODO
// make this into a module by exporting things
exports.poll = function(){
    console.log('hello from the arduino polling function');
};
// make a function for opening a port
// what if the counter polling function could take requests for either run or hit, and stream the hits until the run request was complete?
// make a functoin for sending something in and getting back a request
// what about prototypes, objects, constructors, and closures to make it all cool


// how do I make these the right kinds of functions and how do I expose them

