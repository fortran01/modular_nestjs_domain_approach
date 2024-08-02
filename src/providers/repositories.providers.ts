import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmCustomerRepository } from '../repositories/typeorm-customer.repository';
import { TypeOrmLoyaltyAccountRepository } from '../repositories/typeorm-loyalty-account.repository';
import { TypeOrmProductRepository } from '../repositories/typeorm-product.repository';
import { TypeOrmCategoryRepository } from '../repositories/typeorm-category.repository';
import { TypeOrmPointEarningRuleRepository } from '../repositories/typeorm-point-earning-rule.repository';
import { TypeOrmPointTransactionRepository } from '../repositories/typeorm-point-transaction.repository';
import { CustomerTable } from '../models/database/customer.table';
import { LoyaltyAccountTable } from '../models/database/loyalty-account.table';
import { ProductTable } from '../models/database/product.table';
import { CategoryTable } from '../models/database/category.table';
import { PointEarningRuleTable } from '../models/database/point-earning-rule.table';
import { PointTransactionTable } from '../models/database/point-transaction.table';

/**
 * Provides dependency injection configurations for repository providers.
 */
export const repositoryProviders: Provider[] = [
  {
    provide: 'ICustomerRepository',
    useFactory: (dataSource: DataSource): TypeOrmCustomerRepository =>
      new TypeOrmCustomerRepository(
        dataSource.getRepository<CustomerTable>(CustomerTable),
      ),
    inject: [DataSource],
  },
  {
    provide: 'ILoyaltyAccountRepository',
    useFactory: (dataSource: DataSource): TypeOrmLoyaltyAccountRepository =>
      new TypeOrmLoyaltyAccountRepository(
        dataSource.getRepository<LoyaltyAccountTable>(LoyaltyAccountTable),
      ),
    inject: [DataSource],
  },
  {
    provide: 'IProductRepository',
    useFactory: (dataSource: DataSource): TypeOrmProductRepository =>
      new TypeOrmProductRepository(
        dataSource.getRepository<ProductTable>(ProductTable),
      ),
    inject: [DataSource],
  },
  {
    provide: 'ICategoryRepository',
    useFactory: (dataSource: DataSource): TypeOrmCategoryRepository =>
      new TypeOrmCategoryRepository(
        dataSource.getRepository<CategoryTable>(CategoryTable),
      ),
    inject: [DataSource],
  },
  {
    provide: 'IPointEarningRuleRepository',
    useFactory: (dataSource: DataSource): TypeOrmPointEarningRuleRepository =>
      new TypeOrmPointEarningRuleRepository(
        dataSource.getRepository<PointEarningRuleTable>(PointEarningRuleTable),
      ),
    inject: [DataSource],
  },
  {
    provide: 'IPointTransactionRepository',
    useFactory: (dataSource: DataSource): TypeOrmPointTransactionRepository =>
      new TypeOrmPointTransactionRepository(
        dataSource.getRepository<PointTransactionTable>(PointTransactionTable),
      ),
    inject: [DataSource],
  },
];
