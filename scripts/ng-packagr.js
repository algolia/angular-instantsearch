/* eslint-disable import/no-commonjs, no-console, no-process-exit */
const ngPackage = require('ng-packagr');

ngPackage
  .ngPackagr()
  .forProject('ng-package.json')
  // We are using a custom tsconfig so we can disable the TypeScript version check
  // ideally this isn't needed, but our dependencies use newer versions of TS
  .withTsConfig('tsconfig.ngc.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
