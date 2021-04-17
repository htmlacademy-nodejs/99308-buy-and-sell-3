'use strict';

const express = require(`express`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const offersRouter = require(`./routes/offers-routes`);
const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);
app.listen(DEFAULT_PORT);
