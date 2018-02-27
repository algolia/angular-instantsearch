const chokidar = require('chokidar');
const devServer = require('./devServer.js');
const builder = require('./builder.js');
const { start: middlewares } = require('./middlewares');
const path = require('path');

// we build once at start
builder({ middlewares }, err => {
  if (err) {
    throw err;
  }

  // watch and serve docs/ (browser sync)
  devServer();
});

// then we watch and rebuild
chokidar
  .watch(
    [
      path.join(__dirname, 'src/**/*'),
      path.join(__dirname, 'layouts/**/*.pug'),
    ],
    {
      ignoreInitial: true,
      ignored: /assets\/js\/(.*)?\.js$/,
    }
  )
  .on('all', () =>
    builder({ clean: false, middlewares }, err => {
      if (err) {
        throw err;
      }
    })
  )
  .on('error', err => {
    throw err;
  });
