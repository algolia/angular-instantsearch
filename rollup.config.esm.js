import config from './rollup.config.umd';

config.output = {
  format: 'es',
  file: 'dist/bundles/angular-instantsearch.esm.js',
};

export default config;
