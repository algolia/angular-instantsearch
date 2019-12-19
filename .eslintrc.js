module.exports = {
  extends: 'algolia',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'new-cap': [
      'error',
      { capIsNewExceptions: ['Component', 'NgModule', 'Input', 'Inject'] },
    ],
  },
};
