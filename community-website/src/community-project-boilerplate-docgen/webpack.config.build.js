// this is the webpack config when building docs for production

const webpackConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  ...webpackConfig,
  mode: 'production',
  devtool: 'source-map',
  output: {
    ...webpackConfig.output,
    filename: '[name]-build.js', // hash is made with `plugins/rev-assets.js`
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      // The version 1.2.7 of uglifyjs-webpack-plugin changed the default option
      // to compress: { inline: 1 } but it breaks the application. Revert the previous
      // default value did the trick.
      uglifyOptions: {
        compress: true,
      },
    }),
    ...webpackConfig.plugins,
  ],
};
