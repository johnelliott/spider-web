/*jslint node: true */
'use strict';

var model = require('../runs');

describe('Runs model', function(){
    describe('Store function', function(){
	it('Should have something in run', function() {
	    var runs = [{'message':'hello from test run'}];
	    var callback = function(err, data){
		if (err) throw err;
		return 'success';
	    };
	    var result = model.store(runs, callback);
	    expect(result).toBe('success');
	});
	it('Should store something when 2 things are sent in', function(){
	    var runs = [{"message":"hello from run test 1"}, {"message":"hello from the run test 2"}];
	    var callback = function(err, data){
		if (err) throw err;
		return 'success';
	    };
	    var result = model.store(runs, callback);
	    expect(result).toBe('success');
	});
    });
});
