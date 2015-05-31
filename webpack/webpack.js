var webpack = require("webpack");

// returns a Compiler instance
var compiler = webpack({
    // configuration
});

compiler.run(function(err, stats) {
    // ...
});
// or
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    // ...
});
