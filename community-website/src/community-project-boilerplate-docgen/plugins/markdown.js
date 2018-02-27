const path = require('path');
const md = require('./mdRenderer');

const isMarkdown = filepath => /\.md|\.markdown/.test(path.extname(filepath));

module.exports = function markdown(files, metalsmith, done) {
  Object.keys(files).forEach(file => {
    if (!isMarkdown(file)) return;
    const data = files[file];
    const dir = path.dirname(file);
    let html = `${path.basename(file, path.extname(file))}.html`;
    if (dir !== '.') html = `${dir}/${html}`;
    const str = md.render(data.contents.toString(), { path: html });
    data.contents = new Buffer(str);
    // eslint-disable-next-line no-param-reassign
    delete files[file];
    // eslint-disable-next-line no-param-reassign
    files[html] = data;
  });

  done();
};
