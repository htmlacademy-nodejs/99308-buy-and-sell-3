'use strict';

const fs = require(`fs`).promises;
const {getLogger} = require(`./logger`);
const FILENAME = `mocks.json`;
let data = null;

const logger = getLogger({name: `api`});

const getMockData = async () => {
  if (data !== null) {
    return data;
  }
  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
    throw err;
  }
  return data;
};

module.exports = getMockData;
