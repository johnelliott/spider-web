/*jslint node: true */
'use strict';

var redis = require('./redis');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB

var sp = new SerialPort(localSerialPort, {
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
    redis.lpush('runs', data, function (err, reply) {
	console.log(reply);
    });
});
