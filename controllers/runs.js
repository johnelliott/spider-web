(function() {
    'use strict';
    var model = require('../models/runs');
    var _ = require('underscore');
    
    // save runs to model
    exports.store = function(req, res, next) {
	var runs = _.clone(req.body);
	var run = {"message":"hello from the run"}; // arduino poll stub
	console.log('controller says: '+run);	// REMOVE THIS LATER
	model.store(run, function(err, data){
	    if (err) return res.send(503, err);
	    next();
	});
    };
    
 // remove older runs from model
    exports.trim = function(req, res, next) {
	console.log('hello from trim middleware');
	next();
    };

 // send runs to server
    exports.send = function(req, res, next) {
	res.send('success');
    };

})();
