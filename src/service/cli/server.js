'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILE = `./mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
  <!Doctype html>
  <html>
    <head>
      <title>Local Server</title>
    </head>
    <body>${message}</body>
  </html>
  `.trim();
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;
  if (req.url === `/`) {
    try {
      const fileContent = await fs.readFile(FILE);
      const mocks = JSON.parse(fileContent);
      const message = mocks.map((offer) => {
        return `<li>${offer.title}</li>`;
      }).join(``);
      sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
    } catch (err) {
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
    }
  } else {
    sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Create server error`, err));
        }
        return console.info(
            chalk.green(`Server listening at http://localhost:${port}`)
        );
      });
  }
};
