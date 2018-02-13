const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const highlight = require('./syntaxHighlighting.js');

const md = new MarkdownIt('default', {
  highlight: (str, lang) => highlight(str, lang),
  linkify: true,
  typographer: true,
  html: true,
}).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: 'anchor',
  permalinkSymbol: '',
  // generate proper Getting_started.html#install hrefs since we are
  // using the base href trick to handle different base urls (dev, prod)
  permalinkHref: (slug, { env: { path } }) => `${path}#${slug}`,
});

module.exports = md;
