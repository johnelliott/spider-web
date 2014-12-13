var runs = require('../runs');

describe('Runs model', function(){
    describe('Store function', function(){
	it('Should have something in run', function() {
	    var inputRuns = {'message':'hello'};
	    var callback = function(err, data){
		if (err) throw err;
		return 'success';
	    };
	    var result = runs.store(inputRuns, callback);
	    expect(result).toBe('success');
	});
    });
});

// old thing from a silly test of oen file while looking at the wrong file
// describe("Redis library file", function() {
//     var a;

//     it("and so is a spec", function() {
// 	a = true;
// 	var runs = [{'message':'hello, I am from Jasmine!'}];
// 	var callback = function(err, data){
// 	    if (err) throw err;
// 	    return 'success';
// 	};
// 	var result = redis.store(runs, callback);
	
// 	expect(result).toBe(true);
//     });
// });
