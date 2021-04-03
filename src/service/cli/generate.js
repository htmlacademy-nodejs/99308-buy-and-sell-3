'use strict';

const {
  FILE_NAME,
  DEFAULT_COUNT,
  MAX_OFFERS,
  CATEGORIES_FILE_PATH,
  SENTENCES_FILE_PATH,
  TITLES_FILE_PATH,
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

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, categories, sentences, titles) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(0, getRandomInt(1, 2)),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(
        PictureRestrict.MIN,
        PictureRestrict.MAX
    )),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: getRandomItem(Object.values(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX)
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const categories = await readContent(CATEGORIES_FILE_PATH);
    const sentences = await readContent(SENTENCES_FILE_PATH);
    const titles = await readContent(TITLES_FILE_PATH);
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS) {
      console.error(chalk.red(`Не больше ${MAX_OFFERS} объявлений!`));
      process.exit(ExitCode.ERROR);
    }
    const content = JSON.stringify(generateOffers(countOffer, categories, sentences, titles));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};
