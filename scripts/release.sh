#!/bin/bash

set -e # exit when error

# check we are on master
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "master" ]
then
  echo "Not on master branch, exiting"
  exit 1
fi

# read actual dist/package.json version
actual_version=$(grep version package.json | cut -c 15- | rev | cut -c 3- | rev)

# ask user for next version
echo
echo "Actual version: ${actual_version}"
echo "What is the next version?"
read next_version

# replace package.json with next version
sed -i.bak "s/${actual_version}/${next_version}/g" src/version.ts
sed -i.bak "s/${actual_version}/${next_version}/g" dist/package.json
sed -i.bak "s/${actual_version}/${next_version}/g" package.json

# remove .bak files from sed
rm -f package.json.bak dist/package.json.bak src/version.ts.bak

# show and update changelog
conventional-changelog -p angular -u

echo
read -p "Is the changelog correct? [y/N] " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
  conventional-changelog -p angular -i CHANGELOG.md -s
else
  git reset origin master --hard
  exit 1
fi

# clean node_modules and build library
echo "Build library"
rm -rf node_modules
yarn
yarn build

# copy README.md and CHANGELOG.md to dist folder
cp README.md CHANGELOG.md dist

# commit and tag
git add package.json dist/package.json CHANGELOG.md
git commit -m "chore(release): publish v${next_version}"
git tag $next_version

echo
read -p "Is everything correct? (Check in a new tab) [y/N] " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
  git push origin master
  git push --tags
  yarn doc:publish
  (cd dist && npm publish)
else
  git reset origin/master --hard
  exit 1
fi
