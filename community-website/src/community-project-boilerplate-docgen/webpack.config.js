const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');
const HappyPack = require('happypack');

module.exports = {
  entry: {
    'js/main': path.join(__dirname, 'assets/js/main.js'),
  },
  output: {
    path: config.docsDist,
    publicPath: config.publicPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=babel',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=style',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'js/common',
      minChunks: module =>
        /\/react\//.test(module.context) ||
        /\/react-dom\//.test(module.context) ||
        /\/lodash\//.test(module.context) ||
        /\/fbjs\//.test(module.context) ||
        /\/algolia-frontend-components\//.test(module.context),
    }),
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['babel-preset-env'], 'babel-preset-react'],
          },
        },
      ],
      id: 'babel',
    }),
    new HappyPack({
      loaders: [
        'style-loader?insertAt=top',
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
      id: 'style',
    }),
  ],
};
