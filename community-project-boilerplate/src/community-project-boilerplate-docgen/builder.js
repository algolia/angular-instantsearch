/* eslint-disable no-console */

const metalsmith = require('metalsmith');
const config = require('./config.js');

module.exports = function builder({ clean = true, middlewares }, cb) {
  console.time('metalsmith build');
  // default source directory is join(__dirname, 'src');
  // https://github.com/metalsmith/metalsmith#sourcepath
  metalsmith(__dirname)
    .metadata(config)
    .clean(clean)
    .destination(config.docsDist)
    .use(middlewares)
    .build(err => {
      console.timeEnd('metalsmith build');
      cb(err);
    });
};
