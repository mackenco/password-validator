const program = require('commander');
const packageJSON = require('./../package.json');
const { buildCommon, buildErrors } = require('./helpers');
const log = require('./logging');

module.exports = function run() {
  let stdin = '';
  let common;

  /**
   * The meat of the program - parse the common file, validate passwords, log erorrs
   */
  function validatePasswords() {
    program.parse(process.argv);
    const passwords = stdin.concat(program.passwords || '');
    const errors = buildErrors(passwords, common);
    errors.length ? log.error(errors) : log.success(['All passwords are valid!']);
    process.exit(0);
  }

  program
    .version(packageJSON.version)
    .description('Validates a list of passwords per NIST guidelines')
    .option('-p, --passwords [passwords]', 'passwords')
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
