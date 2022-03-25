const { it, describe } = require('mocha');
const superTest = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Suite Test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await superTest(app).get('/contact').expect(200);

      assert.deepStrictEqual(response.text, 'contact us page');
    });
  });

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await superTest(app).get('/hi').expect(200);

      assert.deepStrictEqual(response.text, 'hello world');
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await superTest(app)
        .post('/login')
        .send({ username: 'csevero', password: '123' })
        .expect(200);

      assert.deepStrictEqual(response.text, 'logging has succeeded');
    });

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP status 401', async () => {
      const response = await superTest(app)
        .post('/login')
        .send({ username: 'csevero', password: '123456' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, 'logging failed!');
    });
  });
});
