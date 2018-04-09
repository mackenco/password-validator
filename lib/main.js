/**
 * TODO
 * add examples for flags and all combos
 * add --help to readme
 * unit test readInput + code coverage
 * try / catch for finding paths?
 *
 */
const program = require('commander');
const packageJSON = require('./../package.json');
const { buildCommon, buildErrors, readInput } = require('./helpers');
const log = require('./logging');

module.exports = function run() {
  let stdin = '';
  let common;

  function validatePasswords() {
    program.parse(process.argv);
    const passwords = [stdin, program.passwords, program.input].filter(p => p).join(',');
    const errors = buildErrors(passwords, common);
    errors.length ? log.error(errors) : log.success(['All passwords are valid!']);
    process.exit(0);
  }

  program
    .version(packageJSON.version)
    .description('Validates a list of passwords per NIST guidelines')
    .option('-i, --input [input]', 'Path to text file containing passwords', readInput)
    .option('-p, --passwords [passwords]', 'Comma-separated list of passwords to validate', pw => pw || '')
    .arguments('[common-path]')
    .action((commonPath) => {
      common = buildCommon(commonPath);
    });

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) {
      stdin += chunk;
    } else {
      validatePasswords();
    }
  });

  process.stdin.on('end', validatePasswords);
};
