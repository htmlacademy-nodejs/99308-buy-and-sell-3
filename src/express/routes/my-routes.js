'use strict';

const {Router} = require(`express`);

const myRouter = new Router();
const api = require(`../api`).getAPI();

myRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`my-tickets`, {offers});
});
myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`comments`, {offers});
});

module.exports = myRouter;
