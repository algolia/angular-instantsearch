#!/bin/bash

set -e # exit when error

yarn build

(
  cd examples/$1
  rm -rf ./node_modules/angular-instantsearch
  mkdir -p ./node_modules/angular-instantsearch
  cp -R ../../dist/* ./node_modules/angular-instantsearch
  yarn start
)
