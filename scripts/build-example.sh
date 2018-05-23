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

  ./node_modules/.bin/ng build --prod --base-href "."
)
