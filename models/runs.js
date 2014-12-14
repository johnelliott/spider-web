/*jslint node: true */
'use strict';

var redis = require('../lib/redis');

// Save runs to database (redis)
// params are runs, an array
// and callback, a function
exports.store = function(runs, callback) {
    if (!runs.length) return callback(null, null);
    var run = runs.pop();

    redis.lpush('runs', run, function(err, data) {
	if (err) return callback(err, null);
	exports.store(err, callback);
    });
};

