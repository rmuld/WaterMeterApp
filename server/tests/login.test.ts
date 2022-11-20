import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';

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

const baseUrl = 'localhost:3000/'

describe.only('Login controller', () => {
    describe('POST /api/v1/login', () => {
        //õige email ja õige parool    
        it('responds with  message and status code 200', async () => {
        const response = await request(baseUrl).post('api/v1/login').send(adminUser);
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal('token');
        });
    });
    
    describe.only('POST /api/v1/login', () => { 
        //ei saada midagi kaasa post päringuga
       it('responds with error message and status code 400', async () => {
           const response = await request(baseUrl).post('api/v1/login');
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(400);
           expect(response.body.success).to.be.false;
       });
        
       //email on vale
       it('responds with error message and status code 404', async () => {
           const response = await request(baseUrl).post('api/v1/login').send(wrongUser);
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(404);
           expect(response.body.success).to.be.false;
           expect(response.body.message).to.equal('User not found');
       });
           
        //õige email ja õige parool  
       it('responds with  message and status code 200', async () => {
           const response = await request(baseUrl).post('api/v1/login').send(adminUser);
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(200);
           expect(response.body.success).to.be.true;
           expect(response.body.token).to.a('string');
       });

       //õige email ja vale parool
       it('responds with  message and status code 200', async () => {
           const response = await request(baseUrl).post('api/v1/login').send(wrongPassword);
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(200);
           expect(response.body.success).to.be.true;
           expect(response.body.message).to.equal('token');
       });
     });
});