/*jslint node: true */
'use strict';

var redis = require('../lib/redis');
var counter = require('../lib/counter');

// Save runs to database (redis)
// params are runs, an array
// and callback, a function
exports.store = function(runs, callback) {
    if (!runs.length) return callback(null, null);
    var run = runs.pop();
    console.log(run);
    redis.lpush('runs', JSON.stringify(run), function(err, data) {
	if (err) return callback(err, null);
	exports.store(err, callback);
    });
};

