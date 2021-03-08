'use strict';

const {CATEGORIES, SENTENCES, TITLES, OfferType, SumRestrict, PictureRestrict} = require(`../../constants`);
const {getRandomInt, shuffle, getPictureFileName} = require(`../../utils`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, 2)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX)
  }))
);

module.exports = {
  name: `--generate`,
  run() {

  }
};
