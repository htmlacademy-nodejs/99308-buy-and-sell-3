'use strict';

const {
  FILE_NAME,
  DEFAULT_COUNT,
  MAX_OFFERS,
  CATEGORIES,
  SENTENCES,
  TITLES,
  OfferType,
  SumRestrict,
  PictureRestrict,
  ExitCode
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getRandomItem
} = require(`../../utils`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, 2)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(
        PictureRestrict.MIN,
        PictureRestrict.MAX
    )),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: getRandomItem(Object.values(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX)
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS) {
      console.error(chalk.red(`Не больше ${MAX_OFFERS} объявлений!`));
      process.exit(ExitCode.ERROR);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};
