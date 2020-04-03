/* eslint-disable import/no-commonjs */
const fs = require('fs');
const path = require('path');

module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  shouldPrepare: ({ releaseType, commitNumbersPerType }) => {
    const { fix = 0 } = commitNumbersPerType;
    if (releaseType === 'patch' && fix === 0) {
      return false;
    }
    return true;
  },
  getTagName: ({ version }) => version,
  versionUpdated: ({ version, dir }) => {
    fs.writeFileSync(
      path.resolve(dir, 'src', 'version.ts'),
      `export const VERSION = '${version}';\n`
    );
  },
  pullRequestTeamReviewers: ['instantsearch-for-websites'],
  buildCommand: ({ version }) => `VERSION=${version} yarn build`,
  beforePublish: ({ exec }) => {
    exec('cp CHANGELOG.md dist');
  },
  publishCommand: ({ defaultCommand }) => `cd dist && ${defaultCommand}`,
  slack: {
    // We send Slack messages only for `releaseSuccess`.
    prepared: null,
    releaseSuccess: ({
      appName,
      version,
      tagName,
      latestCommitHash,
      latestCommitUrl,
      repoURL,
    }) => ({
      pretext: [
        `:tada: Successfully released *${appName}@${version}*`,
        '',
        `Make sure to run \`yarn run release-templates\` in \`create-instantsearch-app\`.`,
      ].join('\n'),
      fields: [
        {
          title: 'Branch',
          value: 'master',
          short: true,
        },
        {
          title: 'Commit',
          value: `*<${latestCommitUrl}|${latestCommitHash}>*`,
          short: true,
        },
        {
          title: 'Version',
          value: version,
          short: true,
        },
        {
          title: 'Release',
          value: `${repoURL}/releases/tag/${tagName}`,
        },
      ],
    }),
  },
};
