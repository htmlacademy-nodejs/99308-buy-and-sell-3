'use strict';

const express = require(`express`);
const {Router} = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILE = `./mocks.json`;

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    const offersRouter = new Router();

    app.use(express.json());

    offersRouter.get(`/`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILE);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        console.error(chalk.red(err));
        res.json([]);
      }
    });

    app.use(`/offers`, offersRouter);
    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
    });

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
