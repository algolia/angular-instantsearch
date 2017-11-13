#!/bin/bash

set -e # exit when error

yarn build
yarn link

(
  cd examples/e-commerce
  yarn
  yarn link angular-instantsearch
  yarn start
)
