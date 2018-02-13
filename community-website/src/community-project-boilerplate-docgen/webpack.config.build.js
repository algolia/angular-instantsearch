// this is the webpack config when building docs for production

const webpackConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  ...webpackConfig,
  devtool: 'source-map',
  output: {
    ...webpackConfig.output,
    filename: '[name]-build.js', // hash is made with `plugins/rev-assets.js`
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    ...webpackConfig.plugins,
  ],
};
