import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SeedCommand } from './commands/seed.command';

/**
 * The main bootstrap function to initialize the NestJS application.
 */
async function bootstrap(): Promise<void> {
  // Create a new NestJS application instance with the AppModule.
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure static assets directory.
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Set the base directory for the view templates.
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Set Handlebars as the view engine.
  app.setViewEngine('hbs');

  // Use cookie-parser middleware to parse cookies attached to the client request object.
  app.use(cookieParser());

  // Apply global validation pipes with specific configurations.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators.
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes.
      forbidNonWhitelisted: true, // Throw errors when non-whitelisted properties are found.
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit conversion of types during transformation.
      },
    }),
  );

  // Start listening for incoming requests on port 3000.
  const server = await app.listen(3000);

  // Handle shutdown on SIGINT and SIGTERM signals
  const gracefulShutdown = async () => {
    await server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

  const args = process.argv.slice(2);
  if (args[0] === 'seed') {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seeder = app.get(SeedCommand);
    await seeder.seed();
    await app.close();
  }
}

// Call the bootstrap function to start the application.
bootstrap();
