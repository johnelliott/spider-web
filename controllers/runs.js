(function() {
    'use strict';
    var model = require('../models/runs');
    var _ = require('underscore');
    
    // save runs to model
    exports.store = function(req, res, next) {
	// save request body in case we need it
	var reqBody = _.clone(req.body);
	var runs = [{"message":"hello from the run"}]; // arduino poll stub
	model.store(runs, function(err, data){
	    if (err) return res.send(503, err);
	    next();
	});
    };
    
 // remove older runs from model
    exports.trim = function(req, res, next) {
	next();
    };

 // send runs to server
    exports.send = function(req, res, next) {
	res.send('success');
    };

})();
