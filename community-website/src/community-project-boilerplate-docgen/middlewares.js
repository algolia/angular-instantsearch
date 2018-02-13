const headings = require('metalsmith-headings');
const layouts = require('metalsmith-layouts');
const msWebpack = require('ms-webpack');
const sass = require('metalsmith-sass');
const cleanCSS = require('metalsmith-clean-css');
const assets = require('./plugins/assets.js');
const helpers = require('./plugins/helpers.js');
const ignore = require('./plugins/ignore.js');
const markdown = require('./plugins/markdown.js');
const onlyChanged = require('./plugins/onlyChanged.js');
const webpackEntryMetadata = require('./plugins/webpackEntryMetadata.js');
const autoprefixer = require('./plugins/autoprefixer.js');
const webpackStartConfig = require('./webpack.config.start.js');
const webpackBuildConfig = require('./webpack.config.build.js');

const common = [
  helpers,
  assets({
    source: './assets/',
    destination: './assets/',
  }),
  ignore(fileName => {
    // if it's a build js file, keep it (`build`)
    if (/-build\.js$/.test(fileName)) return false;

    // if it's any other JavaScript file, ignore it, it's handled by build files above
    if (/\.js$/.test(fileName)) return true;

    // ignore scss partials, only include scss entrypoints
    if (/_.*\.s[ac]ss/.test(fileName)) return true;

    // otherwise, keep file
    return false;
  }),
  markdown,
  headings('h2'),
  sass({
    sourceMap: true,
    sourceMapContents: true,
    outputStyle: 'nested',
  }),
  // since we use @import, autoprefixer is used after sass
  autoprefixer,
];

// development mode
module.exports = {
  start: [
    webpackEntryMetadata(webpackStartConfig),
    ...common,
    onlyChanged,
    layouts('pug'),
  ],
  build: [
    msWebpack({
      ...webpackBuildConfig,
      stats: {
        chunks: false,
        modules: false,
        chunkModules: false,
        reasons: false,
        cached: false,
        cachedAssets: false,
      },
    }),
    ...common,
    cleanCSS({
      files: 'stylesheets/**/*.css',
      cleanCSS: {
        rebase: false,
      },
    }),
    layouts('pug'),
  ],
};
