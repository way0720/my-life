var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
// var flexibility = require('postcss-flexibility');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      'whatwg-fetch',
      './src/index.js'
    ],
  },
  debug: false,
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-life',
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['index'],
      // favicon: path.join(__dirname, '../assets/favicon.ico')
    }),
    
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CopyWebpackPlugin([
      { from: './assets/' }
    ]),
    new webpack.ProvidePlugin({
      CSSModules: 'react-css-modules'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test')
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css?$/,
        exclude: [path.join(__dirname, "../src/components")],
        loaders: ['style', 'css']
      },
      {test: /\.(jpg|png|woff|jpeg)$/, loader: "url-loader?limit=8192"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10240&mimetype=image/svg+xml'}
    ]
  },
};