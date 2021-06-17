'use strict';

const {Router} = require(`express`);
const {
  CategoryService,
  OfferService,
  CommentService
} = require(`../data-service`);

const category = require(`./category`);
const offer = require(`./offer`);

const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
  offer(app, new OfferService(mockData), new CommentService(mockData));
})();

module.exports = app;
