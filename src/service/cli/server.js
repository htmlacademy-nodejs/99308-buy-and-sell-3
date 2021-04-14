'use strict';

const http = require(`http`);
const chalk = require(`chalk`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    http.createServer()
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
