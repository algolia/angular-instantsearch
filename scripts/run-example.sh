#!/bin/bash

set -e # exit when error

yarn
yarn build

(
  cd examples/$1
  yarn

  # copy angular-instantsearch
  rm -rf ./node_modules/angular-instantsearch
  mkdir -p ./node_modules/angular-instantsearch
  cp -R ../../dist/* ./node_modules/angular-instantsearch

  # copy same instantsearch.js version
  rm -rf ./node_modules/instantsearch.js
  mkdir -p ./node_modules/instantsearch.js
  cp -R ../../node_modules/instantsearch.js/* ./node_modules/instantsearch.js

  # copy same helper version
  rm -rf ./node_modules/algoliasearch-helper
  mkdir -p ./node_modules/algoliasearch-helper
  cp -R ../../node_modules/algoliasearch-helper/* ./node_modules/algoliasearch-helper

  if [ $1 = "server-side-rendering" ]; then
    yarn build:ssr
    yarn serve:ssr
  else
    yarn start
  fi
)
