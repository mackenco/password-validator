const { red, green } = require('chalk');

module.exports.success = (message) => {
  message.forEach(m => console.log(green(m)));
};

module.exports.error = (message) => {
  message.forEach(m => console.log(red(m)));
};
