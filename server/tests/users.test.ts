import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { adminUser, baseUrl  } from './testData';

describe('Users controller', () => {
  describe('GET /api/v1/users', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
    it('responds with users array and statusCode 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.users).to.be.a('array');
      expect(response.body.users.length).to.be.gt(1);
    });
  });
});