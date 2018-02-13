const fs = require('fs');
const path = require('path');
const glob = require('glob');
const hasha = require('hasha');
const replace = require('replace-in-file');
const config = require('../config.js');

const DIST_PATH = path.resolve(config.docsDist);

// HELPERS TO ADD REVISION HASH TO FILENAMES
// -----------------------------------------
function computeHashForFiles(files) {
  const promises = files.map(file =>
    hasha.fromFile(file, { algorithm: 'md5' }).then(hash => ({ file, hash }))
  );

  return Promise.all(promises);
}

function renameFiles(files) {
  return files.map(({ file, hash }) => {
    const ext = path.extname(file);
    const newPath = `${file.replace(ext, `-${hash}`)}${ext}`;

    // rename original with hash file
    fs.renameSync(file, newPath);

    // check for `.[css|js].map` files to rename also
    if ((ext === '.css' || ext === '.js') && fs.existsSync(`${file}.map`)) {
      fs.renameSync(`${file}.map`, `${newPath}.map`);
    }

    return { oldPath: file, newPath };
  });
}

function renameReferences(inFiles, files) {
  const { from, to } = files.reduce(
    (toRename, { oldPath, newPath }) => ({
      from: [
        ...toRename.from,
        new RegExp(oldPath.replace(`${DIST_PATH}/`, ''), 'g'),
      ],
      to: [...toRename.to, newPath.replace(`${DIST_PATH}/`, '')],
    }),
    { from: [], to: [] }
  );

  return replace({ from, to, files: inFiles });
}

function computeFiles([filesGlob, replaceFilesGlob]) {
  const files = glob.sync(`${DIST_PATH}/${filesGlob}`);
  return computeHashForFiles(files)
    .then(renameFiles)
    .then(result =>
      renameReferences(`${DIST_PATH}/${replaceFilesGlob}`, result)
    );
}

module.exports = function revAssets() {
  // 1. compute MD5 for images / json -> replace in CSS, JS, HTML
  // 2. compute MD5 for CSS -> replace in JS, HTML
  // 3. compute MD5 for JS -> replace in HTML
  const imagesJson = ['**/*.{json,svg,png,jpeg,jpg,gif}', '**/*.{js,html,css}'];
  const css = ['**/*.css', '**/*.{js,html}'];
  const js = ['**/*.js', '**/*.html'];

  return computeFiles(imagesJson)
    .then(() => computeFiles(css))
    .then(() => computeFiles(js));
};
