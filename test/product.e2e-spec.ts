import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestApp } from './setup';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../src/models/messages/product.dto';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdProductId: number;
  const productCookie: string = 'product_id=random_cookie_value';

  it('/products (POST) - Create a new product', async () => {
    const newProduct: CreateProductDto = {
      name: 'New Product',
      price: 99.99,
      image_url: 'http://example.com/product.jpg',
      categoryId: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Cookie', productCookie)
      .send(newProduct)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
    expect(response.body.image_url).toBe(newProduct.image_url);

    createdProductId = response.body.id;
  });

  it('/products/:id (GET) - Get a product by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .set('Cookie', productCookie)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdProductId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('image_url');
  });

  it('/products/:id (PUT) - Update a product', async () => {
    const updatedProduct: UpdateProductDto = {
      name: 'Updated Product',
      price: 109.99,
      image_url: 'http://example.com/updated_product.jpg',
    };

    const response = await request(app.getHttpServer())
      .put(`/products/${createdProductId}`)
      .set('Cookie', productCookie)
      .send(updatedProduct)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdProductId);
    expect(response.body.name).toBe(updatedProduct.name);
    expect(response.body.price).toBe(updatedProduct.price);
    expect(response.body.image_url).toBe(updatedProduct.image_url);
  });

  it('/products (GET) - Get all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Cookie', productCookie)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('price');
    expect(response.body[0]).toHaveProperty('image_url');
  });

  it('/products/:id (DELETE) - Delete a product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .set('Cookie', productCookie)
      .expect(204);

    // Verify that the product was deleted
    await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .set('Cookie', productCookie)
      .expect(404);
  });
});
