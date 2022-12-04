import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { adminUser, baseUrl } from './testData';

describe('Addresses controller', () => {
    describe('GET /api/v1/addresses', () => {
        it('responds with error message and statusCode 401', async () => {
        const response = await request(baseUrl).get('/api/v1/addresses');

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal('Token not found');
        });
        it('responds with  message and status code 200', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).get('api/v1/addresses').set('Authorization', `Bearer ${token}`);
    
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.addresses).to.be.a('array');
        expect(response.body.addresses.length).to.be.gt(1);
        });
            
    });
    describe('GET /api/v1/addresses/:id', () => {
        it('responds with error message and statusCode 401', async () => {
        const response = await request(baseUrl).get('/api/v1/addresses/1');

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal('Token not found');
        });

        it('responds with  message and status code 200', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).get('api/v1/addresses/1').set('Authorization', `Bearer ${token}`);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal('Address');
        expect(response.body.data.address).to.be.a('object');
        });
            
    });

    describe('POST api/v1/addresses/', () => {
        const newAddress = {
            postalCode: "12345",
            houseNumber: "91",
            apartmentNumber: "0",
            streetName: "test tänav",
            municipality: "Viimsi vald",
            county: "Harju maakond",
            country: "TESTLAND",
        };
        
        const withoutPostalCode = {
            houseNumber: "91",
            apartmentNumber: "0",
            streetName: "test tänav",
            municipality: "Viimsi vald",
            county: "Harju maakond",
            country: "TESTLAND",
        };

        const withoutCountry = {
            postalCode: "12345",
            houseNumber: "91",
            apartmentNumber: "0",
            streetName: "test tänav",
            municipality: "Viimsi vald",
            county: "Harju maakond",
        }

        it('responds with  status code 200', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).post('api/v1/addresses').set('Authorization', `Bearer ${token}`).send(newAddress);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(response.body.success).to.be.true;
        });
        
        it('responds with  message and status code 400', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).post('api/v1/addresses').set('Authorization', `Bearer ${token}`).send(withoutCountry);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal("Some data is missing (postalCode, houseNumber, streetName, municipality, county, country)");
        });
        
        it('responds with  message and status code 400', async () => {
        const login = await request(baseUrl).post('api/v1/login').send(adminUser);
        const token = login.body.token;
        const response = await request(baseUrl).post('api/v1/addresses').set('Authorization', `Bearer ${token}`).send(withoutPostalCode);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal("Some data is missing (postalCode, houseNumber, streetName, municipality, county, country)");
        });
        
        it('responds with  message and status code 401', async () => {
        const response = await request(baseUrl).post('api/v1/addresses').send(newAddress);

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal('Token not found');
        });
            
    });

    // describe('DELETE api/v1/addresses/:id', () => {
        
    //     it('responds with  status code 200', async () => {
    //     const login = await request(baseUrl).post('api/v1/login').send(adminUser);
    //     const token = login.body.token;
    //     const response = await request(baseUrl).delete('api/v1/addresses/1000').set('Authorization', `Bearer ${token}`);

    //     expect(response.body).to.be.a('object');
    //     expect(response.statusCode).to.equal(200);
    //     expect(response.body.success).to.be.true;
    //     expect(response.body.message).to.equal("Address deleted");
    //     });
        
    //     it('responds with  message and status code 404', async () => {
    //     const login = await request(baseUrl).post('api/v1/login').send(adminUser);
    //     const token = login.body.token;
    //     const response = await request(baseUrl).delete('api/v1/addresses/1111').set('Authorization', `Bearer ${token}`);

    //     expect(response.body).to.be.a('object');
    //     expect(response.statusCode).to.equal(404);
    //     expect(response.body.success).to.be.false;
    //     });
            
    // });
});