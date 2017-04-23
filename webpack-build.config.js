var WebpackStrip = require('strip-loader');
var devConfig = require('./webpack.config');

var stripLoader = {
    test: [/\.jsx?$/, /\.es6$/],
    exclude: /node_modules/,
    loader: WebpackStrip.loader('console.log', 'debug')
};
devConfig.module.loaders.push(stripLoader);
module.exports = devConfig;