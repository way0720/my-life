var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: {
    home: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      'whatwg-fetch',
      './src/index.js'
    ],
    img: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      'whatwg-fetch',
      './src/components/ReportList/index.js'
    ],
    bigImg: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/components/ReportDetail/LightOfLife/Record/BaseReport/IKangReport/MedicalReport/BigImg/index.js'
    ]
  },
  debug: true,
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      template: 'src/index.ejs',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      title: '',
      template: 'src/components/ReportList/index.ejs',
      filename: 'img.html',
      chunks: ['img']
    }),
    new HtmlWebpackPlugin({
      title: '',
      template: 'src/components/ReportDetail/LightOfLife/Record/BaseReport/IKangReport/MedicalReport/BigImg/index.ejs',
      filename: 'bigImg.html',
      chunks: ['bigImg']
    }),
    new CopyWebpackPlugin([
      { from: './assets/' }
    ]),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
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
      // {
      //   test: /\.css?$/,
      //   include: [path.join(__dirname, "../src/components")],
      //   loaders: ['style?sourceMap',
      //     'css?-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      //     'postcss'
      //   ]
      // },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {test: /\.(jpg|png)$/, loader: 'url?limit=8192'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10240&mimetype=image/svg+xml'},
      {test: /\.(woff)$/, loader: 'url-loader?limit=10000'}
    ]
  },
  // postcss: [autoprefixer({ browsers: ['> .01%', 'iOS >= 6'] })]
};