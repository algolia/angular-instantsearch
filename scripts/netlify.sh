#!/bin/bash

set -e # exit when error

rm -rf ./netlify-dist/*
touch ./netlify-dist/.gitkeep

# build community website
(cd community-website && yarn)
(cd community-website/src/community-project-boilerplate-docgen && yarn)
yarn doc:build
mv ./community-website/docs/* ./netlify-dist/

# build examples
yarn examples:ecommerce:build
yarn examples:router:build
yarn examples:media:build

# build dev-novel
MODE=build webpack --config webpack.demo.js

mv ./examples/e-commerce/dist ./netlify-dist/examples/e-commerce
mv ./examples/angular-router/dist ./netlify-dist/examples/angular-router
mv ./examples/media/dist ./netlify-dist/examples/media
