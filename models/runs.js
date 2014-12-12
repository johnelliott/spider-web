(function(){
    'use strict';

    var redis = require('../lib/redis');
    var counter = require('../lib/counter');
    
    // Save runs to database (redis)
    // params are runs, an array
    // and callback, a function
    exports.store = function(runs, callback) {
	// poll counter
	// var run = counter.poll();
	// stub out a polling call for testing
	var run = {"message":"Hello, I'm a run!"};
	// consider a recursive function for an array of hits that come in a bunch
	
	// store run to redis
 	if (!runs.length) return callback(null, null);
	// potentially pop runs here if the objects coming from the polling script become numerous and come in as an array
	redis.lpush('runs', JSON.stringify(run), function(err, reply) {
	    if (err) return callback(err, null);
	    console.log('redis lpush callback says: ' + reply );
	});
	
    };
})();
