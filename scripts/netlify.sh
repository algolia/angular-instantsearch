#!/bin/bash

set -e # exit when error

mkdir -p ./netlify-dist/examples

# build community website
(cd community-website && yarn)
(cd community-website && ROOT_PATH=$ROOT_PATH yarn docs:build)
mv ./community-website/docs/* ./netlify-dist/

# build examples
yarn examples:click-analytics:build

mv ./examples/click-analytics/dist ./netlify-dist/examples/click-analytics
