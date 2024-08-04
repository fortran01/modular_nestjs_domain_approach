import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestApp } from './setup';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../src/models/messages/customer.dto';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdCustomerId: number;
  const customerCookie: string = 'customer_id=random_cookie_value';

  it('/customers (POST) - Create a new customer', async () => {
    const newCustomer: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/customers')
      .set('Cookie', customerCookie)
      .send(newCustomer)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newCustomer.name);
    expect(response.body.email).toBe(newCustomer.email);

    createdCustomerId = response.body.id;
  });

  it('/customers/:id (GET) - Get a customer by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/customers/${createdCustomerId}`)
      .set('Cookie', customerCookie)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCustomerId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('/customers/:id (PUT) - Update a customer', async () => {
    const updatedCustomer: UpdateCustomerDto = {
      name: 'John Updated',
    };

    const response = await request(app.getHttpServer())
      .put(`/customers/${createdCustomerId}`)
      .set('Cookie', customerCookie)
      .send(updatedCustomer)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCustomerId);
    expect(response.body.name).toBe(updatedCustomer.name);
  });

  it('/customers (GET) - Get all customers', async () => {
    const response = await request(app.getHttpServer())
      .get('/customers')
      .set('Cookie', customerCookie)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
  });

  it('/customers/:id (DELETE) - Delete a customer', async () => {
    await request(app.getHttpServer())
      .delete(`/customers/${createdCustomerId}`)
      .set('Cookie', customerCookie)
      .expect(204);

    // Verify that the customer was deleted
    await request(app.getHttpServer())
      .get(`/customers/${createdCustomerId}`)
      .set('Cookie', customerCookie)
      .expect(404);
  });
});
