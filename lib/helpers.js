const fs = require('fs');

const commonJSON = require('./common-passwords');
const log = require('./logging');

const separators = /[(\r\n|\r|\n),]+/;

/**
 * @param {string} path - location of input file
 * @return {string} contents of path or empty string
 */
module.exports.readInput = (path) => {
  if (!path) { return ''; }

  try {
    return fs.readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(`Unable to find input file at ${path}`);
  }
};

/**
 * @param {string} passwords - newline- or comma-delimited list of passwords
 * @param {Object} common - common passwords to check against
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
 * @param {string} path - location of common passwords file
 * @return {Object} returns common password object
 */
module.exports.buildCommon = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
      .split(separators)
      .reduce((manifest, password) => {
        manifest[password] = true; // eslint-disable-line no-param-reassign
        return manifest;
      }, {});
  } catch (e) {
    log.warn([`Warning: Unable to find common password file at ${path}, using default file.`]);
    return commonJSON;
  }
};
