'use strict';

const db = require('dmdb');
const formatExecuteResult = require('./formatExecuteResult.js');

class Client {
  // options:{'host':'', 'port':'', 'user':'', 'password':'','schema':''}
  constructor(options) {
    this.pool == null;
    this.options = options;
  }

  async query(sql, bindParams, options) {
    const conn = await getConnection(this.pool, this.options);
    const result = await conn.execute(sql, bindParams, options);
    conn.close();
    return await formatExecuteResult(result);
  }
}

async function createPool(options) {
  try {
    return db.createPool({
      connectString: `dm://${options.user}:${options.password}\@${options.host}:${options.port}?schema=${options.schema || options.user}`,
      poolMax: 10,
      poolMin: 1,
    });
  } catch (err) {
    throw new Error('egg-dmdb createPool error: ' + err.message);
  }
}
async function getConnection(pool, options) {
  if (!pool) { pool = await createPool(options); }
  return await pool.getConnection();
}

module.exports = Client;
