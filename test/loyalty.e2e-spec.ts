import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestApp } from './setup';
import { LoginDto } from '../src/models/messages/login.dto';
import { DatabaseSeeder } from '../src/database/seeder';
import { AddToCartDto } from '../src/models/messages/add-to-cart.dto';

describe('LoyaltyController (e2e)', () => {
  let app: INestApplication;
  let customerId: number;

  beforeAll(async () => {
    app = await setupTestApp();
    await app.get(DatabaseSeeder).seed();
    customerId = 1;
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

  it('/cart (GET) - Get cart before adding items', async () => {
    const response = await request(app.getHttpServer())
      .get('/cart')
      .set('Cookie', `customer_id=${customerId}`)
      .expect(200);

    expect(response.body).toHaveProperty('items');
    expect(response.body.items).toEqual([]);
  });

  it('/cart (POST) - Add item to cart', async () => {
    const addToCartDto: AddToCartDto = {
      productId: 2,
      quantity: 2,
    };

    const response = await request(app.getHttpServer())
      .post('/cart')
      .set('Cookie', `customer_id=${customerId}`)
      .send(addToCartDto)
      .expect(201);

    expect(response.body).toEqual({});
  });

  it('/checkout (POST) - Process checkout and verify cart is emptied', async () => {
    // Process checkout
    const checkoutResponse = await request(app.getHttpServer())
      .post('/checkout')
      .set('Cookie', `customer_id=${customerId}`)
      .expect(201);

    expect(checkoutResponse.body).toHaveProperty('total_points_earned');
    expect(checkoutResponse.body.total_points_earned).toEqual(30);

    // Verify cart is emptied
    const cartResponse = await request(app.getHttpServer())
      .get('/cart')
      .set('Cookie', `customer_id=${customerId}`)
      .expect(200);

    expect(cartResponse.body).toHaveProperty('items');
    expect(cartResponse.body.items).toEqual([]);
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
