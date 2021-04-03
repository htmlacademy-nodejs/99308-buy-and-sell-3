'use strict';

const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--help`;
const MAX_OFFERS = 1000;
const FILE_NAME = `mocks.json`;
const USER_ARGV_INDEX = 2;

const CATEGORIES_FILE_PATH = `../../data/categories.txt`;
const SENTENCES_FILE_PATH = `../../data/sentences.txt`;
const TITLES_FILE_PATH = `../../data/titles.txt`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

module.exports = {DEFAULT_COUNT, DEFAULT_COMMAND, MAX_OFFERS, FILE_NAME, USER_ARGV_INDEX, CATEGORIES_FILE_PATH, SENTENCES_FILE_PATH, TITLES_FILE_PATH, OfferType, SumRestrict, PictureRestrict, ExitCode};
