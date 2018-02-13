// this file will start a browsersync server that will serve /docs
// it will automatically inject any css
// it will also use webpack and watch/build/hot reload

const webpack = require('webpack');
const browserSync = require('browser-sync');
const webpackConfig = require('./webpack.config.start');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compression = require('compression');
const config = require('./config.js');

module.exports = function() {
  const compiler = webpack(webpackConfig);
  const bs = browserSync.create();
  bs.init({
    server: config.docsDist,
    open: false,
    files: `${config.docsDist}/**/*`,
    watchOptions: {
      ignored: [
        /\.js$/, // any change to a JavaScript file must be ignored, webpack handles it
        /\.css\.map$/, // no need to reload the whole page for CSS source maps
      ],
      awaitWriteFinish: {
        stabilityThreshold: 150, // wait 150ms for the filesize to be stable (= write finished)
      },
    },
    notify: {
      styles: {
        bottom: 0,
        top: 'auto',
      },
    },
    middleware: [
      compression(),
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
      }),
      webpackHotMiddleware(compiler),
    ],
  });
};
