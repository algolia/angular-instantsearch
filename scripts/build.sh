#!/bin/bash

set -e # exit when error

# clean dist folder
rm -rf dist

# compile through ng-packagr
ng-packagr -p ng-package.json

# copy and rename css from instantsearch.css
cp node_modules/instantsearch.css/themes/*.css dist/bundles

mv dist/bundles/reset.css dist/bundles/instantsearch.css
mv dist/bundles/reset-min.css dist/bundles/instantsearch.min.css

mv dist/bundles/algolia.css dist/bundles/instantsearch-theme-algolia.css
mv dist/bundles/algolia-min.css dist/bundles/instantsearch-theme-algolia.min.css
