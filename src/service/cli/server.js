'use strict';

const express = require(`express`);
const routes = require(`../api`);
const chalk = require(`chalk`);
const {HttpCode, API_PREFIX} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
      .listen(port)
      .on(`listening`, () => {
        return console.info(
            chalk.green(`Server listening at http://localhost:${port}`)
        );
      })
      .on(`error`, (err) => {
        return console.error(chalk.red(`Create server error`, err));
      });
  }
};
