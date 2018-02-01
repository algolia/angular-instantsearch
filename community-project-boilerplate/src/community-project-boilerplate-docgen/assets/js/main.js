import activateClipboard from './activateClipboard.js';
import alg from 'algolia-frontend-components/javascripts.js';
import './editThisPage.js';

const docSearch = {
  apiKey: '5cb6763f264e31381e18639a1147634c',
  indexName: 'react-instantsearch',
  inputSelector: '#searchbox',
};

/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const header = new alg.communityHeader(docSearch);

const container = document.querySelector('.documentation-container');
const codeSamples = document.querySelectorAll('.code-sample');

activateClipboard(codeSamples);
// eslint-disable-next-line no-console
console.log('Welcome to main page');
