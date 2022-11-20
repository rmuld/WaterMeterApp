import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const adminUser = {
    email: 'juhan@juurikas.ee',
    password: 'juurikas'
}

const wrongUser = {
    email: 'wrong@wrong.ee',
    password: 'wrongpassword'
}

const wrongPassword = {
    email: 'juhan@juurikas.ee',
    password: 'wrongpassword'
}

describe('Users controller', () => {
  describe('GET /api/v1/users', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(app).get('/api/v1/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
    it('responds with users array and statusCode 200', async () => {
      // const login = await request(app).post('/api/v1/login').send(adminUser);
      // console.log('RESPONSE: ', login)

      //const token = login.body.token;
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdWhhbkBqdXVyaWthcy5lZSIsImlhdCI6MTY2ODU0MDk0OCwiZXhwIjoxNjY4NTU1MzQ4fQ.FkB1czxQXh-L-JQz9AmXSSKVuu9tvQpzFrez1Pyj5Uc";
      const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);
      console.log("USERS: ", response.body)
      //expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      //expect(response.body.success).to.be.true;
      //expect(response.body.users).to.be.a('array');
      //expect(response.body.users.length).to.be.gt(1);
    });
  });
});