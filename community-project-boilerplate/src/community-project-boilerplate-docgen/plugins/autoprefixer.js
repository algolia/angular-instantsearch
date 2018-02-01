const postcss = require('postcss');
const syntax = require('postcss-scss');
const autoprefixer = require('autoprefixer');

module.exports = function sassAutoprefixer(files, metalsmith, done) {
  const processor = postcss([autoprefixer]);
  Object.keys(files)
    .filter(file => /\.css$/.test(file))
    .forEach(file => {
      const originalContent = files[file].contents.toString();
      const autoprefixedContent = processor.process(originalContent, {
        syntax,
      }).css;
      // eslint-disable-next-line no-param-reassign
      files[file].contents = new Buffer(autoprefixedContent);
    });

  done();
};
