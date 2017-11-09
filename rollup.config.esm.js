import config from './rollup.config.umd';

config.output = {
  format: 'es',
  file: 'dist/angular-instantsearch.esm.js',
};

export default config;
