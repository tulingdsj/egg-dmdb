'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.dmdb.name;
  }

  async select_1_as_num() {
    // const rows1 = await this.app.dmdb.query('SELECT 3 AS NUM3, 4 AS NUM4;');
    // console.log(rows1);
    // const rows2 = await this.app.dmdb.query('SELECT * from "sys_user" limit 0,3', [], { resultSet: true });
    // console.log(rows2);
    this.ctx.body = '1';
  }
}

module.exports = HomeController;
