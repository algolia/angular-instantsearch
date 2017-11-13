#!/bin/bash

set -e # exit when error

yarn build

(
  cd examples/e-commerce
  rm -rf node_modules
  yarn
  mkdir ./node_modules/angular-instantsearch
  cp -R ../../dist/* ./node_modules/angular-instantsearch
  yarn build
)
