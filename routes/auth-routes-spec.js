import request from 'supertest';
import server from '../server';

describe('server', () => {
  const user = {
    firstname: 'James',
    lastname: 'Doe',
    email: 'jamesdoe@me.com',
    password: '1234567',
    address: 'Lambda X',
    occupation: 'Student',
    phone: '12345678901',
    marital_status: 'None',
  };
  it('[POST] for auth register', () => (
    request(server)
      .post('/auth/register')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual({ message: 'user  created successfully', data: user });
      })
  ));
});
