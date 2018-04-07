const { red, green } = require('chalk');

module.exports.success = (message) => {
  console.log(green(message));
};

module.exports.error = (message) => {
  message.forEach(m => console.log(red(m)));
};
