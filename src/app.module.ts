import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoyaltyController } from './controllers/loyalty.controller';
import { ProductController } from './controllers/product.controller';
import { CustomerController } from './controllers/customer.controller';
import { Customer } from './domain/customer.entity';
import { LoyaltyAccount } from './domain/loyalty-account.entity';
import { Product } from './domain/product.entity';
import { Category } from './domain/category.entity';
import { PointEarningRule } from './domain/point-earning-rule.entity';
import { PointTransaction } from './domain/point-transaction.entity';
import { DatabaseSeeder } from './database/seeder';
import { SeedCommand } from './commands/seed.command';
import { repositoryProviders } from './providers/repositories.providers';
import { serviceProviders } from './providers/services.providers';

/**
 * Main application module, configuring imports, controllers, providers, and seeding capabilities.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'loyalty_program.db',
      entities: [
        Customer,
        LoyaltyAccount,
        Product,
        Category,
        PointEarningRule,
        PointTransaction,
      ] as const,
      synchronize: true,
    } as TypeOrmModuleOptions),
  ],
  controllers: [LoyaltyController, ProductController, CustomerController],
  providers: [
    ...repositoryProviders,
    ...serviceProviders,
    DatabaseSeeder,
    SeedCommand,
  ],
})
export class AppModule {}
