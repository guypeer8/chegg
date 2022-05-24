const { join } = require('path');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const slowDown = require('express-slow-down');
const rateLimit = require('express-rate-limit');

const apiRouter = require('./api');

const PORT = process.env.PORT || 8001;
const isProduction = process.env.PROD === 'true';

const STATICS_DIR = join(require('app-root-dir').get(), 'build');

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

const apiSpeedLimiter = slowDown({
  windowMs: 60 * 1000, 
  delayAfter: 100,
  delayMs: 1000,
});

const createApp = () => {
  const app = express();

  app.use(helmet({
    xssFilter: { setOnOldIE: false },
  }));

  app.use(express.static(STATICS_DIR));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (!isProduction) {
    app.use(require('cors')());
    app.use(require('morgan')('dev'));
  }

  app.use('/api', apiLimiter, apiSpeedLimiter, apiRouter);

  return app;
};

const runApp = app => {
  app.listen(PORT, err => {
    if (err) {
      return console.error(err);
    }
    console.info(`App running on port ${PORT}.`);
  });
};

module.exports = {
  createApp,
  runApp,
};
