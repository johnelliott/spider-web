//axon
// var axon = require('axon');
// var sock = axon.socket('sub');

// sock.connect(3000);

// sock.on('message', function(msg){
//     console.log(JSON.stringify(msg));
// });

//faye
var faye = require('faye');
var client = new faye.Client('http://localhost:3001/hits');
var subscription = client.subscribe('/hits', function(message) {
    console.log(message);
});

