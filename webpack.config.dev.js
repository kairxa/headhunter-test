var base = require('./webpack.config.base.js');
var webpack = require('webpack');
var path = require('path');
var nodeDir = path.resolve(__dirname, 'node_modules');

var loaders = base.module.loaders.slice();
loaders.push(
  {
      test:/\.(pcss|postcss)$/,
      loader: 'style-loader!css-loader?modules&localIdentName=[path][local]-[hash:base64]!postcss-loader'
  },
  {
      test:/\.(css)$/,
      loader: 'style-loader!css-loader?modules&localIdentName=[path][local]-[hash:base64]'
  }
);

var config = Object.assign({}, base, {
  entry: {
    index: path.resolve(__dirname, 'build/index.dev.jsx'),
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-form'
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  module: {
    loaders
  }
});

module.exports = config;