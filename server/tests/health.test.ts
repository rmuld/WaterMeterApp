import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

describe('Health controller', () => {
  describe('GET /api/v1/health', () => {
    it('responds with  message and status code 200', async () => {
      const response = await request(app).get('/api/v1/health');
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Hello world!');
    });
  });
});