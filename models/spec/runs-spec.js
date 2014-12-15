/*jslint node: true */
'use strict';

var model = require('../runs');
var redis = require('../../lib/redis');
describe('Runs model', function(){
    // describe('Store function', function(){
    // 	it('Should have something in run', function() {
    // 	    var runs = [{'message':'hello from test run'}];
    // 	    var callback = function(err, data){
    // 		if (err) throw err;
    // 		return 'success';
    // 	    };
    // 	    var result = model.store(runs, callback);
    // 	    expect(result).toBe('success');
    // 	});
    // 	it('Should store something when 2 things are sent in', function(){
    // 	    var runs = [{"message":"hello from run test 1"}, {"message":"hello from the run test 2"}];
    // 	    var callback = function(err, data){
    // 		if (err) throw err;
    // 		return 'success';
    // 	    };
    // 	    var result = model.store(runs, callback);
    // 	    expect(result).toBe('success');
    // 	});

    // });
    describe('get function', function() {
	it('should return some data it got', function(){
	    var data = "{'time':'257', 'speed':'0'}";
	    redis.lpush('runs', data);
	    var callback = function(err, data){
		if (err) return err;
		//return redis.lpop('runs');
		return data;
	    };
	    var result = model.get(callback);
	    //redis.ltrim('runs', 0, data.length-1);
	    expect(result).toBe("{'time':'257', 'speed':'0'}");
	});
    });
});
