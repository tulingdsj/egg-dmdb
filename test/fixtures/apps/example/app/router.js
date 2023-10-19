'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/select_1_as_num', controller.home.select_1_as_num);
};
