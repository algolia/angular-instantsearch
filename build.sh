#!/bin/bash

set -e # exit when error

# clean dist folder
rm -rf dist

# compile through AOT
ngc -p tsconfig-aot.json

# bundle through webpack
rollup -c rollup.config.umd.js
rollup -c rollup.config.esm.js

# remove useless files from dist
(
  cd dist && \
  find . \
    \! -name '*.umd.js' \
    \! -name '*.esm.js' \
    \! -name '*.umd.js.map' \
    \! -name '*.esm.js.map' \
    \! -name '*.d.ts' \
    \! -name '*.metadata.json' \
    -delete
)
