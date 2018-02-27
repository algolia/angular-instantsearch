#!/bin/bash

set -e # exit when error

# check we are on master
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "master" ]
then
  echo "Not on master branch, exiting"
  exit 1
fi

rm -rf netlify-dist docs/*

ROOT_PATH=/angular-instantsearch/ yarn netlify
cp -R netlify-dist docs

git add dist-docs
git commit -m "docs(community): deploy documentation website"
git push origin master
