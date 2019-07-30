import request from 'supertest';
import server from './server';

describe('server', () => {
  it('[GET] / WORKS!', () => (
    request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Welcome to Master Your Money platform' });
      })
  ));
});
