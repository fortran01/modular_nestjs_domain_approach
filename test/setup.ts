import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { testDbConfig } from '../src/test-db-config';
import * as cookieParser from 'cookie-parser';

/**
 * Sets up and initializes a new NestJS application for testing purposes.
 * It uses the TypeORM module configured specifically for testing, includes cookie parsing middleware,
 * and configures logging at a specified log level.
 * @returns A promise that resolves to an instance of INestApplication.
 */
export async function setupTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(testDbConfig), AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  app.use(cookieParser());
  await app.init();
  return app;
}
