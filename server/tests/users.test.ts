import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { adminUser, regularUser, updateUser, wrongUser, wrongPassword, baseUrl  } from './testData';

describe('Users controller', () => {
  describe('GET /api/v1/users', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/users');

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
    
    it('responds with error message and statusCode 401', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(wrongUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users').set('Authorization', `Bearer ${token}`);
      
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token is not valid');
    });
    
    it('responds with error message and statusCode 401', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(wrongPassword);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users').set('Authorization', `Bearer ${token}`);
      
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token is not valid');
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
    
    it('responds with an user and statusCode 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(regularUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.users).to.be.a('object');
      expect(response.body.users.firstName).to.equal('Testiina');
    });
  });

  describe('GET /api/v1/users:id', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/users/1');

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });

    it('responds with error message and statusCode 401', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(wrongUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users/1').set('Authorization', `Bearer ${token}`);
      
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token is not valid');
    });

    it('responds with error message and statusCode 401', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(wrongPassword);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users/1').set('Authorization', `Bearer ${token}`);
      
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token is not valid');
    });

    it('responds with user object and statusCode 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).get('api/v1/users/1').set('Authorization', `Bearer ${token}`);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('User');
      expect(response.body.data.user).to.be.a('object');
    });

  });

  describe('UPDATE /api/v1/users:id', () => {
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).get('/api/v1/users/1');

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });

    it('responds with user object and statusCode 200', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).patch('api/v1/users/1').set('Authorization', `Bearer ${token}`).send(updateUser);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('User updated');
    });
  });

  describe('POST /api/v1/users', () => {
    const newUser = {
      firstName: "Testiina",
      lastName: "Perenimi",
      personalNumber: "4561195944",
      email: "test@test.ee",
      password: "mysuperpassword",
    };

    const fakeUser = {
      firstName: "Andmed puudu",
    };

    it('responds with user object and statusCode 201', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).post('api/v1/users').set('Authorization', `Bearer ${token}`).send(newUser);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body.success).to.be.true;
    });

    it('responds with error message and statusCode 400', async () => {
      const login = await request(baseUrl).post('api/v1/login').send(adminUser);
      const token = login.body.token;
      const response = await request(baseUrl).post('api/v1/users').set('Authorization', `Bearer ${token}`).send(fakeUser);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal("Some data is missing (firstName, lastName, email, password, personalNumber, phone)");
    });
    
    it('responds with error message and statusCode 401', async () => {
      const response = await request(baseUrl).post('api/v1/users').send(newUser);

      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found');
    });
  });

  // describe.only('DELETE /api/v1/users/:id', () => {
    
  //   it('responds with statusCode 200', async () => {
  //     const login = await request(baseUrl).post('api/v1/login').send(adminUser);
  //     const token = login.body.token;
  //     const response = await request(baseUrl).delete('api/v1/users/1001').set('Authorization', `Bearer ${token}`);

  //     expect(response.body).to.be.a('object');
  //     expect(response.statusCode).to.equal(200);
  //     expect(response.body.success).to.be.true;
  //     expect(response.body.message).to.equal("User deleted");
  //   });

  //   it('responds with error message and statusCode 404 ', async () => {
  //     const login = await request(baseUrl).post('api/v1/login').send(adminUser);
  //     const token = login.body.token;
  //     const response = await request(baseUrl).delete('api/v1/users/1111').set('Authorization', `Bearer ${token}`);

  //     expect(response.body).to.be.a('object');
  //     expect(response.statusCode).to.equal(404);
  //     expect(response.body.success).to.be.false;
  //     expect(response.body.message).to.equal("User not found");
  //   });
  // });

});