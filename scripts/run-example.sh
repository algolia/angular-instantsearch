#!/bin/bash

set -e # exit when error

yarn build
yarn link

(
  cd examples/$1
  yarn
  yarn link angular-instantsearch
  yarn start
)
