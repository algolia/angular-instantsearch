const algoliaComponents = require('algolia-frontend-components');
const fs = require('fs');
const path = require('path');

const content = require('./src/data/communityHeader.json');
const headerAlgoliaLogo = fs
  .readFileSync(
    path.join(__dirname, 'assets/images/algolia-logo-whitebg.svg'),
    'utf8'
  )
  .toString();
const headerCommunityLogo = fs
  .readFileSync(
    path.join(__dirname, 'assets/images/algolia-community-dark.svg'),
    'utf8'
  )
  .toString();
const header = algoliaComponents.communityHeader(content, {
  algoliaLogo: headerAlgoliaLogo,
  communityLogo: headerCommunityLogo,
});

const configs = {
  production: {
    docsDist: path.join(__dirname, '..', '..', 'docs'),
  },
  development: {
    docsDist: path.join(__dirname, '..', '..', 'docs-dev'),
  },
};

module.exports = {
  ...configs[process.env.NODE_ENV],
  publicPath: process.env.ROOT_PATH || '/',
  header,
};
