'use strict';
const DMClient = require('./client.js');

let count = 0;
module.exports = app => {
  // 第一个参数 dmdb 指定了挂载到 app 上的字段，我们可以通过 `app.dmdb` 访问到 dmdb singleton 实例
  // 第二个参数 createDmdb方法 接受两个参数(config, app)，并返回一个 dmdb 的实例
  app.addSingleton('dmdb', createDmdb);
};

/**
 * @param  {Object} config   框架处理之后的配置项，如果应用配置了多个 dmdb 实例，会将每一个配置项分别传入并调用多次 createDmdb
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 dmdb 实例
 */
function createDmdb(config, app) {
  if (!(config.host && config.port && config.user && config.password)) { 
    throw new Error('[egg-dmdb] \'host\', \'port\', \'user\', \'password\' are required on config'); 
  }

  // 创建实例
  const client = new DMClient(config);

  // 做启动应用前的检查
  app.beforeStart(async () => {
    const rows = await client.query('select LEFT(CONVERT(varchar,now()),19) as "currentTime"');
    // const rows = await client.query('select 1 as "a",2 as "b";', [], { resultSet: true });
    const index = count++;
    app.coreLogger.info(`[egg-dmdb] init instance[${index}] success, db currentTime: ${rows[0].currentTime}`);
  });

  return client;
}
