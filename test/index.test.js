'use strict';

const mock = require('egg-mock');

describe('test/index.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/example',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, dmdb')
      .expect(200);
  });

  it('should GET /select_1_as_num', () => {
    return app.httpRequest()
      .get('/select_1_as_num')
      .expect('1')
      .expect(200);
  });

});
