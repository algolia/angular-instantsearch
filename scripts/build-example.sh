#!/bin/bash

set -e # exit when error

yarn build

(
  cd examples/$1
  rm -rf node_modules
  yarn
  mkdir -p ./node_modules/angular-instantsearch
  cp -R ../../dist/* ./node_modules/angular-instantsearch
  ./node_modules/.bin/ng build --prod --base-href "." -d ""
)
