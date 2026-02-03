const request = require('supertest');

let app;
let server;

beforeAll(() => {
  // Require index.js ONCE and capture server
  app = require('../index');

  // Access the internal server from Express
  server = app.listen ? app : null;
});

afterAll((done) => {
  // Close the server so Jest can exit
  if (server && server.close) {
    server.close(done);
  } else {
    done();
  }
});

describe('Suyog App Routes', () => {

  test('GET / should return home response', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Suyog Sinnarkar');
    expect(res.text).toContain('Hey there');
  });

  test('GET /signin should return signin page message', async () => {
    const res = await request(app).get('/signin');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('sign in page');
    expect(res.text).toContain('credentials');
  });

});
