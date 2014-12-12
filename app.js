(function() {
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var runs = require ('./controllers/runs');
    var app = express();
    var port = process.env.PORT || 8000;

    // Listen on port 8000
    app.listen(port, function(){
	console.log("listening on port %d", port);
    });

    // expect to receive json and parse if it checks out
    app.use(bodyParser.json());

    // routes
    app.get('/', runs.store, runs.trim, runs.send, function(req, res){
	res.send('\ndone\n');
    });

})();
