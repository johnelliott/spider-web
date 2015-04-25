var faye = require('faye');
var config = require('./config');

var client = new faye.Client('http://localhost:' +
    process.env.LISTENERPORT || 3001 +
    '/hits');
console.log('Faye listening on port ' + process.env.LISTENERPORT);
var subscription = client.subscribe('/hits', function(message) {
    console.log(message);
});
