/* eslint no-console:0 max-len:0 */
/* eslint-disable import/no-commonjs */
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const semver = require('semver');
const { version: currentVersion } = require('../package.json');

if (!process.env.VERSION) {
  throw new Error(
    'bump: Usage is VERSION=MAJOR.MINOR.PATCH scripts/bump-package-version.js'
  );
}
const newVersion = process.env.VERSION;

if (!semver.valid(newVersion)) {
  throw new Error(
    `bump: Provided new version ${newVersion} is not a valid version per semver`
  );
}

if (semver.gte(currentVersion, newVersion)) {
  throw new Error(
    `bump: Provided new version is not higher than current version (${newVersion} <= ${currentVersion})`
  );
}

console.log(`Bumping ${newVersion}`);

console.log('..Updating src/version.ts');

const versionFile = path.join(__dirname, '../src/version.ts');
const newContent = `export const VERSION = "${newVersion}";\n`;
fs.writeFileSync(versionFile, newContent);

console.log('..Updating package.json');

replace.sync({
  files: [path.join(__dirname, '..', 'package.json')],
  from: `"version": "${currentVersion}"`,
  to: `"version": "${newVersion}"`,
});

replace.sync({
  files: [path.join(__dirname, '..', 'dist', 'package.json')],
  from: `"version": "${currentVersion}"`,
  to: `"version": "${newVersion}"`,
});
