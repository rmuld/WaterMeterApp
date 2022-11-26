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
    console.log("RES: ", response.body)
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

    // describe('POST /api/v1/addresses/', () => {
    //     const newAddress = {
    //         postalCode: "12345",
    //         houseNumber: "91",
    //         apartmentnumber: null,
    //         city: "Tallinn",
    //         municipality: null,
    //         county: "Harju maakond"
    //     };

    //     it('responds with  message and status code 200', async () => {
    //     const login = await request(baseUrl).post('api/v1/login').send(adminUser);
    //     const token = login.body.token;
    //     const response = await request(baseUrl).get('api/v1/addresses').set('Authorization', `Bearer ${token}`);

    //     expect(response.body).to.be.a('object');
    //     expect(response.statusCode).to.equal(200);
    //     expect(response.body.success).to.be.true;
    //     expect(response.body.message).to.equal('Address');
    //     expect(response.body.data.address).to.be.a('object');
    //     });
            
    // });
});