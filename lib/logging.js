const { red, green } = require('chalk');
/**
 * These clearly don't do much, but my intention was to isolate them, making it easier to test and
 * add other features, (e.g. writing to a log file, some other side effects) if necessary
 */

/**
 * @param {string[]} message
 */
module.exports.success = (message) => {
  message.forEach(m => console.log(green(m)));
};

/**
 * @param {string[]} message
 */
module.exports.error = (message) => {
  message.forEach(m => console.log(red(m)));
};
