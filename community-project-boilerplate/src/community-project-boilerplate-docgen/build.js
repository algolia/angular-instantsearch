const builder = require('./builder.js');
const revAssets = require('./plugins/rev-assets.js');
const { build: middlewares } = require('./middlewares');

builder({ middlewares }, err => {
  if (err) {
    throw err;
  }

  revAssets();
});
