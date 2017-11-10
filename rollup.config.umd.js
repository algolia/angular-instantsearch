/* eslint no-console: 0 */
/* eslint import/no-commonjs: 0 */

export default {
  input: 'dist/index.js',
  name: 'ng.instantsearch',
  sourcemap: true,
  externals: [
    '@angular/core',
    '@angular/common',
    'instantsearch.js',
    'lodash-es',
    'nouislider',
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
  },
  output: {
    format: 'umd',
    file: 'dist/bundles/angular-instantsearch.umd.js',
  },
};
