const fs = require('fs');

const commonJSON = require('./common-passwords');

const separators = /[(\r\n|\r|\n),]+/;

/**
 * @param {string} passwords newline- or comma-delimited list of passwords
 * @param {Object} common common passwords to check against
 * @return {string[]} errors for each supplied password
 */
module.exports.buildErrors = (passwords, common = commonJSON) => {
  const nonASCII = /[^\x00-\x7F]/g;

  if (!passwords) {
    return ['Error: No Passwords Supplied'];
  }

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

/**
 * @param {string} path location of common passwords file
 * @return {Object} returns common password object
 */
module.exports.buildCommon = (path) => {
  if (!path) { return commonJSON; }

  return fs.readFileSync(path, 'utf8')
    .split(separators)
    .reduce((manifest, password) => {
      manifest[password] = true; // eslint-disable-line no-param-reassign
      return manifest;
    }, {});
};
