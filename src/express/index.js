'use strict';

const express = require(`express`);
const DEFAULT_PORT = 8080;

const app = express();

app.listen(DEFAULT_PORT)
  .on(`listening`, () => {
    console.log(`Express listening at http://localhost:8080`);
  })
  .on(`error`, (err) => {
    console.log(`Express error: `, err);
  });

app.get(`/`, (req, res) => {
  res.send(`/`);
});
