/* eslint no-param-reassign: 0 */
/* eslint prefer-rest-params: 0 */
/* eslint import/no-commonjs: 0 */

const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.MODE;
const isProd = ENV === 'build';
const nodeModules = path.join(process.cwd(), 'node_modules');

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join(...[__dirname].concat(args));
}

module.exports = {
  devtool: isProd ? 'cheap-module-source-map' : 'eval-source-map',

  entry: {
    polyfills: './examples/dev-novel/polyfill.ts',
    main: './examples/dev-novel/main.ts',
    styles: [
      './node_modules/instantsearch.css/themes/reset.css',
      './node_modules/instantsearch.css/themes/algolia.css',
    ],
  },

  output: {
    path: root('netlify-dist', 'dev-novel'),
    publicPath: isProd ? '/dev-novel/' : '/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js',
  },

  resolve: {
    modules: [root('dev-novel'), 'node_modules'],
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'angular-instantsearch': root('src/index.ts'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.ts$/,
        use: 'angular2-template-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=fonts/[name].[hash].[ext]?',
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV),
        VERSION: JSON.stringify(require('./package.json').version),
      },
    }),

    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.resource && module.resource.startsWith(nodeModules),
      chunks: ['main'],
    }),

    new CommonsChunkPlugin({
      names: ['vendor', 'polyfills', 'inline'],
    }),

    // Inject script and link tags into html files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './examples/dev-novel/public/index.html',
      chunksSortMode: 'dependency',
    }),

    new webpack.LoaderOptionsPlugin({
      // add debug messages
      debug: !isProd,
      minimize: isProd,
    }),

    // Workaround to remove Webpack warning in system_js_ng_module_factory_loader.js
    // See https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      root('examples', 'dev-novel', 'app')
    ),
  ],

  devServer: {
    contentBase: 'dev-novel/src/public',
    historyApiFallback: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
  },
};
