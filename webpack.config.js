var webpack = require("webpack");

module.exports = {
    context: __dirname + "/app",
    entry: "./src/app",
    output: {
        path: __dirname + "/app/public/assets",
        filename: "waybot.js"
    },
    module: {
        loaders: [
            // use .es6.js files to do babel
            {test: /\.js$/, loader: "babel"}
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin("common.js"),
        new webpack.ProvidePlugin({
            React: "react/addons"
        })
    ]
};
