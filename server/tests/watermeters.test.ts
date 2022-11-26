import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { adminUser, baseUrl } from './testData';


describe('Watermeters controller', () => {
    describe('GET /api/v1/water-meter', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/water-meter');

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
    it('responds with  message and status code 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/water-meter').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.watermeters).to.be.a('array');
      expect(response.body.watermeters.length).to.be.gt(1);
    });
        
  });
});