import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestApp } from './setup';
import { LoginDto } from '../src/models/messages/login.dto';
import { CheckoutRequestDto } from '../src/models/messages/checkout-request.dto';
import { DatabaseSeeder } from '../src/database/seeder';

describe('LoyaltyController (e2e)', () => {
  let app: INestApplication;
  let customerId: number;
  let productIds: number[];

  beforeAll(async () => {
    app = await setupTestApp();
    await app.get(DatabaseSeeder).seed();
    customerId = 1; // Assuming a customer ID is available after seeding
    productIds = [1, 2]; // Assuming product IDs are available after seeding
  });

  afterAll(async () => {
    await app.close();
  });

  it('/login (POST) - Customer login', async () => {
    const loginDto: LoginDto = {
      customer_id: customerId.toString(),
    };

    const response = await request(app.getHttpServer())
      .post('/login')
      .send(loginDto)
      .expect(201);

    expect(response.body).toHaveProperty('success', true);
  });

  it('/checkout (POST) - Process checkout', async () => {
    const checkoutDto: CheckoutRequestDto = {
      product_ids: productIds,
    };

    const response = await request(app.getHttpServer())
      .post('/checkout')
      .set('Cookie', `customer_id=${customerId}`)
      .send(checkoutDto)
      .expect(201);

    expect(response.body).toHaveProperty('total_points_earned');
    expect(response.body.total_points_earned).toEqual(2415);
  });

  it('/points (GET) - Retrieve loyalty points', async () => {
    const response = await request(app.getHttpServer())
      .get('/points')
      .set('Cookie', `customer_id=${customerId}`)
      .expect(200);

    expect(response.body).toHaveProperty('points');
    expect(response.body.points).toBeGreaterThan(0);
  });

  it('/logout (GET) - Customer logout', async () => {
    const response = await request(app.getHttpServer())
      .get('/logout')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });
});
