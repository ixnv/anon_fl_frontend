var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');
var notifier = require('node-notifier');

module.exports = require('./webpack.config.js');    // inherit from the main config file

module.exports.watch = true;

// disable the hot reload
module.exports.entry = [
  'babel-polyfill',
  __dirname + '/' + module.exports.app_root + '/index.js'
];

// export css to a separate file
module.exports.module.loaders[1] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass')
};
module.exports.plugins.push(
  new ExtractTextPlugin('../css/main.css')
);

module.exports.plugins.push(new webpack.DefinePlugin({
  __API_URL: JSON.stringify('http://localhost:8000')
}));

module.exports.plugins.push(new WebpackOnBuildPlugin(function(stats) {
  notifier.notify({
    title: 'Webpack',
    message: 'Build is done',
    icon: __dirname + '/webpack.png'
  });
}));
