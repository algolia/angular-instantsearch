const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');

module.exports = {
  entry: {
    'js/main': path.join(__dirname, 'assets/js/main.js'),
  },
  output: {
    path: config.docsDist,
    publicPath: config.publicPath,
    filename: '[name].js',
  },
  // the way yarn dev:doc is launched breaks the default loader module resolution, babel-loader was never found
  // so we enforce it here
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['babel-preset-env'], 'babel-preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader?insertAt=top',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'js/common',
      cacheGroups: {
        vendor(module) {
          return (
            /\/react\//.test(module.context) ||
            /\/react-dom\//.test(module.context) ||
            /\/lodash\//.test(module.context) ||
            /\/fbjs\//.test(module.context) ||
            /\/algolia-frontend-components\//.test(module.context)
          );
        },
      },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
  ],
};
