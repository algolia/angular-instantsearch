#!/usr/bin/env node

/* eslint-disable no-process-exit */
/* eslint-disable import/no-commonjs */

require('colors');

const shell = require('shelljs');
const readline = require('readline-sync');

shell.echo('');

// check if user can publish a new version
const ownersFound = parseFloat(
  shell.exec('npm owner ls | grep "`npm whoami` " | wc -l', {
    silent: true,
  })
);

if (ownersFound !== 1) {
  shell.echo(
    `
You are not an owner of the npm repository,
ask for it before trying to bundle a release.

Please also make sure you started the release
process with 'npm run release' and not 'yarn run release'.
  `.red
  );
  return process.exit(1);
}

// check if branch is clean with all changes commited
const uncommitedChanges = shell
  .exec('git status --porcelain')
  .toString()
  .trim();

if (uncommitedChanges) {
  shell.echo(
    'Working tree is not clean, please commit all your changes before release.'
      .red
  );
  return process.exit(1);
}

const currentBranch = shell
  .exec('git rev-parse --abbrev-ref HEAD', { silent: true })
  .toString()
  .trim();

// check if we are not on branch master or exit
if (currentBranch === 'master') {
  shell.echo(
    `
It's not possible to release a new version from the master branch.
Please checkout any other branch:
  - develop: release new stable version
  - xxxxxxx: release new beta version
  `.red
  );
  return process.exit(1);
}

const strategy = currentBranch !== 'develop' ? 'beta' : 'stable';

// called if process is aborted before publish,
// nothing is pushed nor published remove local changes
function rollback(newVersion) {
  if (strategy === 'stable') {
    shell.exec('git reset --hard origin master');
    shell.exec('git checkout develop');
  } else {
    shell.exec('git reset --hard HEAD~1');
  }

  // remove local created tag
  shell.exec(`git tag -d ${newVersion}`);
}

shell.echo(`You are on "${currentBranch}" branch.`.yellow.underline);
const shouldReleaseVersion = readline.keyInYN(
  `Are you sure you want to release a new ${strategy} version?`.yellow.underline
);

// user started the script by mystake?
if (!shouldReleaseVersion) return process.exit(0);

if (strategy === 'stable') {
  // merge develop on master first
  // and start release from master branch
  shell.echo('');
  shell.echo('Updating working tree'.blue);
  shell.exec('git checkout master');
  shell.exec('git pull origin master');
  shell.exec('git fetch origin --tags');
  shell.exec('git fetch origin develop');
  shell.exec('git merge origin/develop');
}

// Check if next CHANGELOG.md is correct
const { version: currVersion } = require('../package.json');
shell.echo(
  `
- Current version is "${currVersion}"
- Changelog will be generated only if a fix/feat/performance/breaking is found in git log
- You must choose a new ve.rs.ion (semver) ${
    strategy === 'beta' ? 'with -beta.x suffix' : ''
  }
  `.blue
);

shell.exec('conventional-changelog -p angular -u');

if (!readline.keyInYN('Is the changelog correct?'.yellow.underline)) {
  return process.exit(1);
}

shell.echo('');
const newVersion = readline.question(
  strategy === 'stable'
    ? 'Please type the new chosen version '.blue.underline
    : 'Please type the new chosen version (with -beta.x suffix)'.blue.underline
);

if (strategy === 'beta' && !/-beta\.\d{1,}$/.test(newVersion)) {
  shell.echo(
    'The version you specified is incorrect, for a beta you must include `-beta.x` suffix in the version number'
      .red
  );
  return process.exit(1);
}

shell.echo('');
shell.echo(`Bumping version to "${newVersion}"`.blue);

//  replace package.json with next version
shell.exec(`sed -i.bak "s/${currVersion}/${newVersion}/g" src/version.ts`);
shell.exec(`sed -i.bak "s/${currVersion}/${newVersion}/g" dist/package.json`);
shell.exec(`sed -i.bak "s/${currVersion}/${newVersion}/g" package.json`);

// remove .bak files from sed
shell.exec('rm -f package.json.bak dist/package.json.bak src/version.ts.bak');

// install dependencies
shell.echo('');
shell.echo('Install dependencies'.blue);
shell.exec('yarn cache clean');
shell.exec('yarn');

// build library
shell.echo('');
shell.echo(`Building Angular InstantSearch v${newVersion}`.blue);
shell.exec('npm run build');

// Update changelog
shell.exec('conventional-changelog -p angular -i CHANGELOG.md -s');

// Copy README.md and CHANGELOG.md to dist folder
shell.exec('cp README.md CHANGELOG.md dist');

// commit and tag
shell.exec(
  'git add src/version.ts package.json dist/package.json CHANGELOG.md'
);
shell.exec(`git commit -m "chore(release): publish v${newVersion}"`);
shell.exec(`git tag ${newVersion}`);

shell.echo('');
const everythingCorrect = readline.keyInYN(
  'Is everything correct? (Check in a new tab)'.blue.underline
);

if (!everythingCorrect) {
  rollback(newVersion);
  return process.exit(1);
}

shell.echo('');
shell.echo('Push to github, publish on npm'.blue);

// * stable: push on master, merge master to develop and publish
// * beta: push on same branch and publish with beta tag
if (strategy === 'stable') {
  shell.exec('git push origin master');
  shell.exec('git push origin --tags');
  shell.exec('(cd dist && npm publish && cd ..)');
  shell.exec('git checkout develop');
  shell.exec('git pull origin develop');
  shell.exec('git merge master');
  shell.exec('git push origin develop');
} else {
  shell.exec(`git push origin ${currentBranch}`);
  shell.exec('(cd dist && npm publish --tag beta && cd ..');
}

return process.exit(0);
