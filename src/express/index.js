'use strict';

const express = require(`express`);
const mainRouter = require(`./routes/main-routes`);
const DEFAULT_PORT = 8080;

const app = express();

app.use(mainRouter);
app.listen(DEFAULT_PORT);
