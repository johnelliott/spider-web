/*jslint node: true */
'use strict';

var port = process.env.REDIS_PORT || 6379;
var host = process.env.REDIS_HOST || 'localhost';
var auth = process.env.REDIS_AUTH || null;
// require redis and set it up here
var redis = require('redis');
// run locally for now, will need change for Heroku
var client = redis.createClient(port, host);
//if (auth) client.auth(auth);

// handle errors
client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
	console.log("    " + i + ": " + reply);
    });
    client.quit();
});

// expose the client to the rest of the app
module.exports = client;
