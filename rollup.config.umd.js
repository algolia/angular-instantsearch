/* eslint no-console: 0 */
/* eslint import/no-commonjs: 0 */

export default {
  input: 'dist/index.js',
  name: 'ng.instantsearch',
  sourcemap: true,
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/common/http',
    'rxjs/Observable',
    'rxjs/ReplaySubject',
    'rxjs/add/operator/map',
    'rxjs/add/operator/mergeMap',
    'rxjs/add/observable/fromEvent',
    'rxjs/add/observable/of',
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
  onwarn(warning) {
    // Skip certain warnings
    if (
      warning.code !== 'THIS_IS_UNDEFINED' &&
      warning.code !== 'MISSING_GLOBAL_NAME'
    ) {
      console.warn(warning.message);
    }
  },
};
