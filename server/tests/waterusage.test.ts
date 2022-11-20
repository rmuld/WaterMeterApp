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

describe('Watermeters controller', () => {
    describe('GET /api/v1/water-usage', () => {
    //kasutaja teeb päringu ilma tokenita
    it('responds with  message and status code 200', async () => {
      const login = await request(app).post('/api/v1/users').send(adminUser);
      const token = login.body.token;
      const response = await request(app).get('/api/v1/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('token not found');
    });
        
  });
});