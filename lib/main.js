const program = require('commander');
const packageJSON = require('./../package.json');
const { buildCommon, validatePasswords } = require('./helpers');
const log = require('./logging');

module.exports = function run() {
  let stdin = '';

  /**
   * The meat of the program - parse the common file, validate passwords, log erorrs
   */
  function handlePipeEnd() {
    program.parse(process.argv);
    const common = buildCommon(program.commonPasswordPath);
    const passwords = stdin.concat(program.passwords);
    const errors = validatePasswords(passwords, common);
    errors.length ? log.error(errors) : log.success(['All passwords are valid!']);
    process.exit(0);
  }

  /**
   * Adds handlers to read in piped input and pass it along once it ends
   */
  function handlePipedContent() {
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk) {
        stdin += chunk;
      }
    });

    process.stdin.on('end', handlePipeEnd);
  }

  program
    .version(packageJSON.version)
    .description('Validates a list of passwords per NIST guidelines')
    .arguments('[common-password-path]')
    .option('-p, --passwords [passwords]', 'Optional comma-separated list of passwords to validate');

  if (!program.args) {
    // TODO PARSE IT HERE
    program.parse(process.argv);
  }

  handlePipedContent();
};
