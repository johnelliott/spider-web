/*jslint node: true */
'use strict';

var counter = require('../lib/counter');
var runs = require('../models/runs');
var _ = require('underscore');

// send runs to server
exports.get = function(req, res, next) {
  runs.get(function(err, data){
    res.json(err ? 503 : 200, {
      error: err ? true : null,
      errorMessage: err ? err : null,
      data: data
    });
  });
};
