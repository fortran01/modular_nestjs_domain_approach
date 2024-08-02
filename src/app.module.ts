import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyController } from './controllers/loyalty.controller';
import { ProductController } from './controllers/product.controller';
import { CustomerController } from './controllers/customer.controller';
import { CustomerTable } from './models/database/customer.table';
import { LoyaltyAccountTable } from './models/database/loyalty-account.table';
import { ProductTable } from './models/database/product.table';
import { CategoryTable } from './models/database/category.table';
import { PointEarningRuleTable } from './models/database/point-earning-rule.table';
import { PointTransactionTable } from './models/database/point-transaction.table';
import { DatabaseSeeder } from './database/seeder';
import { SeedCommand } from './commands/seed.command';
import { repositoryProviders } from './providers/repositories.providers';
import { serviceProviders } from './providers/services.providers';
import { PointCalculationService } from './models/domain/point-calculation.service';
import { mapperProviders } from './providers/mappers.providers';

/**
 * Main application module, configuring imports, controllers, providers, and seeding capabilities.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'loyalty_program.db',
      entities: [
        CustomerTable,
        LoyaltyAccountTable,
        ProductTable,
        CategoryTable,
        PointEarningRuleTable,
        PointTransactionTable,
      ],
      synchronize: true,
    }),
  ],
  controllers: [LoyaltyController, ProductController, CustomerController],
  providers: [
    ...repositoryProviders,
    ...serviceProviders,
    ...mapperProviders,
    DatabaseSeeder,
    SeedCommand,
    // Domain Services
    PointCalculationService,
  ],
})
export class AppModule {}
