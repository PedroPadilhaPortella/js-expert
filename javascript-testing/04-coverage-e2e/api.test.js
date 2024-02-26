const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite Test', () => {
  describe('/contacts', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contacts')
        .expect(200)

      assert.deepStrictEqual(response.text, 'contatos')
    });
  });

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200)

      assert.deepStrictEqual(response.text, 'Hello World')
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'pedro', password: 'pedro123'})
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging Successfully')
    });

    it('should fail login and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Unknown', password: '321'})
        .expect(200)

        assert.deepStrictEqual(response.text, 'Logging Failed')
    });
  });
});