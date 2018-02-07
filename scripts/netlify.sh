#!/bin/bash

set -e # exit when error

rm -rf ./netlify-dist/*
touch ./netlify-dist/.gitkeep

# build examples
yarn examples:ecommerce:build
yarn examples:router:build
yarn examples:media:build

# build dev-novel
MODE=build webpack --config webpack.demo.js

mv ./examples/e-commerce/dist ./netlify-dist/e-commerce
mv ./examples/angular-router/dist ./netlify-dist/angular-router
mv ./examples/media/dist ./netlify-dist/media
