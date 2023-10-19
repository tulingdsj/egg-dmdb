'use strict';

const main = require('./lib/main');

module.exports = app => {
  if (app.config.dmdb.app) main(app);
};
