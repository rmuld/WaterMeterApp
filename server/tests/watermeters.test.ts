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

    describe('GET /api/v1/water-meter/:id', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/water-meter/1');

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
      
    it('responds with  message and status code 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/water-meter/1').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('Watermeter');
        expect(response.body.data.watermeter).to.be.a('object');
    });
        
    });
  
  describe('POST /api/v1/water-meter/', () => {
    const newWaterMeter = {
      serialNumber: "12345",
      checkingDate: "2022-01-01 00:00:00",
      sealNumber: "1001",
      wmAddressID: "1000",
      wmTypeID: 1,
    }
    
    const withoutSerialNumber = {
      checkingDate: "2022-01-01 00:00:00",
      sealNumber: "1001",
      wmAddressID: "1000",
      wmTypeID: 1,
    }
         
    it('responds with  status code 201', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).post('api/v1/water-meter').set('Authorization', `Bearer ${token}`).send(newWaterMeter);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body.success).to.be.true;
    });
    
    it('responds with  status code 400', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).post('api/v1/water-meter').set('Authorization', `Bearer ${token}`).send(withoutSerialNumber);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Some data is missing (serialNumber, checkingDate, sealNumber, type, address )');
    });
        
  });
});