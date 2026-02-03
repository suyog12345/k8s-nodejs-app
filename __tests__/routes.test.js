const request = require('supertest');
const app = require('../index');

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

afterAll(() => {
  process.exit(0);
});
