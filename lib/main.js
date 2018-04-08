/**
 * TODO
 * document why things are where they are
 * document each function
 * might need to update permissions?
 * to fix - check for with spaces + common?
 */
const program = require('commander');
const packageJSON = require('./../package.json');
const { buildCommon, validatePasswords } = require('./helpers');
const log = require('./logging');

module.exports = function run() {
  let stdin = '';

  function handlePipeEnd() {
    program.parse(process.argv);
    const common = buildCommon(program.commonPasswordPath);
    const errors = validatePasswords(stdin, common);
    errors.length ? log.error(errors) : log.success(['All passwords are valid!']);
    process.exit(0);
  }

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
    .arguments('[common-password-path]');

  if (!program.args) {
    program.parse(process.argv);
  }

  handlePipedContent();
};
