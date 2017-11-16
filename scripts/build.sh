#!/bin/bash

set -e # exit when error

# clean dist folder
(
  cd dist && \
  find . \! -name 'package.json' -delete
)

# compile through AOT
ngc -p tsconfig-aot.json

# bundle through rollup
rollup -c rollup.config.umd.js
rollup -c rollup.config.esm.js

# copy and rename css from instantsearch.css
cp node_modules/instantsearch.css/themes/*.css dist/bundles

mv dist/bundles/reset.css dist/bundles/instantsearch.css
mv dist/bundles/reset-min.css dist/bundles/instantsearch.min.css

mv dist/bundles/algolia.css dist/bundles/instantsearch-theme-algolia.css
mv dist/bundles/algolia-min.css dist/bundles/instantsearch-theme-algolia.min.css

# remove useless files from dist
rm -rf dist/waste
