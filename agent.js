'use strict';

const main = require('./lib/main');

module.exports = agent => {
  if (agent.config.dmdb.agent) main(agent);
};
