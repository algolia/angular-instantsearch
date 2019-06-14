#!/bin/bash

set -e # exit when error

rm -rf ./netlify-dist
mkdir -p ./netlify-dist/examples

# build community website
(cd community-website && yarn)
(cd community-website && ROOT_PATH=$ROOT_PATH yarn docs:build)
mv ./community-website/docs/* ./netlify-dist/

# build package
yarn
yarn build

# build examples
SKIP_PACKAGE_BUILD=true yarn examples:ecommerce:build &> /dev/null
SKIP_PACKAGE_BUILD=true yarn examples:router:build &> /dev/null
SKIP_PACKAGE_BUILD=true yarn examples:media:build &> /dev/null
SKIP_PACKAGE_BUILD=true yarn examples:storybook:build &> /dev/null

mv ./examples/e-commerce/dist ./netlify-dist/examples/e-commerce
mv ./examples/angular-router/dist ./netlify-dist/examples/angular-router
mv ./examples/media/dist ./netlify-dist/examples/media
mv ./examples/storybook/dist ./netlify-dist/examples/storybook
