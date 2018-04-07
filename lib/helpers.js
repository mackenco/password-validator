const fs = require('fs');

const commonJSON = require('./common-passwords');

const separators = /[(\r\n|\r|\n),]+/;

module.exports.validatePasswords = (passwords, common = commonJSON) => {
  const nonASCII = /[^\x00-\x7F]/g;

  return passwords
    .trim()
    .split(separators)
    .map((password) => {
      const errors = [
        common[password] && 'Too Common',
        password.length > 64 && 'Too Long',
        password.length < 8 && 'Too Short',
        nonASCII.test(password) && 'Invalid Characters',
      ].filter(e => e).join(', ');

      return errors.length > 0 && `${password.replace(nonASCII, '*')} -> Error: ${errors}`;
    })
    .filter(p => p);
};

module.exports.buildCommon = (path) => {
  if (!path) { return undefined; }

  return fs.readFileSync(path, 'utf8')
    .split(separators)
    .reduce((manifest, password) => {
      manifest[password] = true; // eslint-disable-line no-param-reassign
      return manifest;
    }, {});
};
