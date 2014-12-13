var redis = require('../redis');

describe("Redis library file", function() {    
    it("should expose a function called client", function() {
	expect(redis.client).toBeDefined();
    });
});
