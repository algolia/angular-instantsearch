/* eslint no-console: 0 */
/* eslint import/no-commonjs: 0 */

export default {
  input: 'dist/index.js',
  name: 'angular-instantsearch',
  sourcemap: true,
  external: [
    '@angular/core',
    '@angular/common',
    'instantsearch.js',
    'lodash-es',
    'nouislider',
  ],
  output: {
    format: 'umd',
    file: 'dist/angular-instantsearch.umd.js',
  },
};
