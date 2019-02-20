#!/bin/bash

set -e # exit when error

yarn
yarn build --no-progress

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

  if [ $1 = "server-side-rendering" ]
  then
    yarn build:ssr
    yarn test
  else
    yarn build --no-progress
    yarn test
  fi
)
