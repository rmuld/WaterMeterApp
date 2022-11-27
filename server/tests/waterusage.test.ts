import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { adminUser, baseUrl } from './testData';


describe('Waterusages controller', () => {
    describe('GET /api/v1/water-usage', () => {
      
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/water-usage');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
      
    it('responds with users array and statusCode 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/water-usage').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.waterusages).to.be.a('array');
      expect(response.body.waterusages.length).to.be.gt(1);
    });
        
    });
  
    describe('GET /api/v1/water-usage/:id', () => {
      
      it('responds with error message and statusCode 401', async () => {
        const response = await request(baseUrl).get('/api/v1/water-usage/1');

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal('Token not found');
      });
        
      it('responds with users array and statusCode 200', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).get('api/v1/water-usage/1').set('Authorization', `Bearer ${token}`);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal('Watermeter usage');
        expect(response.body.waterusage).to.be.a('object');
      });
        
    });
  
    describe('POST /api/v1/water-usage/', () => {
      const newUsage = {
        amount: 1,
        consumptionTime: "2020-01-01",
        waterMeterID: 1000,
      } 

      const fakeUsage = {
        waterMeterID: 1000,
        consupmtionTime: "2022-01-01"
      }

      it('responds with  status code 201', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).post('api/v1/water-usage/').set('Authorization', `Bearer ${token}`).send(newUsage);
        
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(response.body.success).to.be.true;
      });
      
      it('responds with  status code 400', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).post('api/v1/water-usage/').set('Authorization', `Bearer ${token}`).send(fakeUsage);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal('Some data is missing (amount, consumptionTime, waterMeterID )');
      });
          
  });
});