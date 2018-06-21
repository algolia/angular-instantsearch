// this is the webpack config when running `npm start`

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  mode: 'development',
  entry: {
    ...Object.entries(webpackConfig.entry).reduce(
      (memo, [entryName, entryValue]) => ({
        ...memo,
        [entryName]: [
          'babel-polyfill',
          'webpack-hot-middleware/client?reload=true',
          entryValue,
        ],
      }),
      {}
    ),
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), ...webpackConfig.plugins],
};
