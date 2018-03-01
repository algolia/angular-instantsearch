#!/bin/bash

set -e # exit when error

(
  yarn build
  cd dist
  yarn unlink
  yarn link
)

(
  cd examples/$1
  yarn
  yarn link angular-instantsearch
  yarn start
)
