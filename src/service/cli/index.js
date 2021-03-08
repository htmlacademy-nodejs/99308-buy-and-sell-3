'use strict';

const generate = require(`./generate`);
const version = require(`./version`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version
};

module.exports = {
  Cli
};
