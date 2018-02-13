// this is the webpack config when running `npm start`

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    ...Object.entries(webpackConfig.entry).reduce(
      (memo, [entryName, entryValue]) => ({
        ...memo,
        [entryName]: [
          'babel-polyfill',
          'react-hot-loader/patch',
          'webpack-hot-middleware/client?reload=true',
          entryValue,
        ],
      }),
      {}
    ),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...webpackConfig.plugins,
  ],
};
