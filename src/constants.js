'use strict';

const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--help`;
const MAX_OFFERS = 1000;
const MAX_COMMENTS = 4;
const FILE_NAME = `mocks.json`;
const USER_ARGV_INDEX = 2;

const CATEGORIES_FILE_PATH = `./data/categories.txt`;
const SENTENCES_FILE_PATH = `./data/sentences.txt`;
const TITLES_FILE_PATH = `./data/titles.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

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

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const MAX_ID_LENGTH = 6;

const API_PREFIX = `/api`;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {DEFAULT_COUNT, DEFAULT_COMMAND, MAX_OFFERS, MAX_COMMENTS, FILE_NAME, USER_ARGV_INDEX, CATEGORIES_FILE_PATH, SENTENCES_FILE_PATH, TITLES_FILE_PATH, FILE_COMMENTS_PATH, OfferType, SumRestrict, PictureRestrict, ExitCode, HttpCode, MAX_ID_LENGTH, API_PREFIX, Env};
