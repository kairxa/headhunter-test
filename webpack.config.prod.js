var base = require('./webpack.config.base.js');
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");
var OfflinePlugin = require('offline-plugin');
var nodeDir = path.resolve(__dirname, 'node_modules');

var loaders = base.module.loaders.slice();
loaders.push(
  {
      test:/\.(pcss|postcss)$/,
      loader: 'style-loader!css-loader?modules!postcss-loader'
  },
  {
      test:/\.(css)$/,
      loader: 'style-loader!css-loader?modules'
  }
);

var config = Object.assign({}, base, {
  entry: {
    index: path.resolve(__dirname, 'build/index.prod.jsx'),
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new OfflinePlugin({
      externals: ['/index.html'],
      ServiceWorker: {
        output: '../../sw.js'
      },
      AppCache: false
    })
  ],
  module: {
    loaders
  }
});

module.exports = config;