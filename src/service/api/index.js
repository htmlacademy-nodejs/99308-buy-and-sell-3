'use strict';

const {Router} = require(`express`);
const {CategoryService} = require(`../data-service`);
const category = require(`./category`);
const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
})();

module.exports = app;
