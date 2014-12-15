/*jslint node: true */
'use strict';

// App
var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var runs = require ('./controllers/runs');
var app = express();
var port = process.env.PORT || 8000;
var _ = require('underscore');

// Serial port
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var localSerialPort = process.env.LOCALSERIALPORT || '/dev/ttyACM0'; // default to Ras. Pi USB

// Instantiate a serial port
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
});

// expect to receive json and parse if it checks out
app.use(bodyParser.json());

// routes
app.get('/', runs.send, function(req, res){
    res.send('\ndone\n');
});


// Listen on port 8000
app.listen(port, function(){
    console.log("listening on port %d", port);
});
