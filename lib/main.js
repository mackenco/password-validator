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
    const common = buildCommon(program.common);
    const errors = validatePasswords(stdin, common);
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
    .arguments('[common]');

  if (!program.args) {
    program.parse(process.argv);
  }

  handlePipedContent();
};
