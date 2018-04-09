#!/usr/bin/env node --harmony
const program = require('commander');
const packageJSON = require('./../package.json');
const { buildCommon, buildErrors, readInput } = require('./helpers');
const log = require('./logging');

let stdin = '';
let common;

function validatePasswords() {
  try {
    program.parse(process.argv);
    const passwords = [stdin, program.passwords, program.input].filter(p => p).join(',');
    const errors = buildErrors(passwords, common);
    errors.length ? log.error(errors) : log.success(['All passwords are valid!']);
    process.exit(0);
  } catch (error) {
    log.error([error]);
    process.exit(1);
  }
}

program
  .version(packageJSON.version)
  .description('Validates a list of passwords per NIST guidelines')
  .option('-i, --input [input]', 'path to text file containing passwords', readInput)
  .option('-p, --passwords [passwords]', 'comma-separated list of passwords to validate', pw => pw || '')
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
