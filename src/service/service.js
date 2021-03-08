'use strict';

const {Cli} = require(`./cli`);
const {USER_ARGV_INDEX, ExitCode} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);

if (userArguments.length === 0 || !Cli[userArguments.slice(0, 1)]) {
  process.exit(ExitCode.SUCCESS);
}

Cli[userArguments.slice(0, 1)].run(userArguments.slice(1));
