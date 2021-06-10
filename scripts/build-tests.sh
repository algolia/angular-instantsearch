#!/bin/bash

set -e # exit when error

yarn
yarn build --no-progress

(
  cd src/__tests__/tree-shaking/test-app
  yarn

  # copy angular-instantsearch
  rm -rf ./node_modules/angular-instantsearch
  mkdir -p ./node_modules/angular-instantsearch
  cp -R ../../../../dist/* ./node_modules/angular-instantsearch

  # copy same instantsearch.js version
  rm -rf ./node_modules/instantsearch.js
  mkdir -p ./node_modules/instantsearch.js
  cp -R ../../../../node_modules/instantsearch.js/* ./node_modules/instantsearch.js

  rm -rf dist_*
  yarn build --output-path=dist --no-progress
)
