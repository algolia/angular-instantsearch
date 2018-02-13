module.exports = function ignore(testFn) {
  return (files, metalsmith, cb) => {
    Object.keys(files).forEach(fileName => {
      // eslint-disable-next-line no-param-reassign
      if (testFn(fileName) === true) delete files[fileName];
    });

    cb(null);
  };
};
