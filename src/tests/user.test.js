const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/server');
const User = require('../server/db/models/user');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User API', () => {
  let userId;
  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('_id');
    userId = res.body.user._id;
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie'][0]).toContain('jwtToken');
    token = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
  });

  it('should get a user by ID', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Cookie', [`jwtToken=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('_id');
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ email: 'updated@test.com' })
      .set('Cookie', [`jwtToken=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('email', 'updated@test.com');
  });

  it('should delete a user by ID', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Cookie', [`jwtToken=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  });
});
