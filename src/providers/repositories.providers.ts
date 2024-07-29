import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmCustomerRepository } from '../repositories/typeorm-customer.repository';
import { TypeOrmLoyaltyAccountRepository } from '../repositories/typeorm-loyalty-account.repository';
import { TypeOrmProductRepository } from '../repositories/typeorm-product.repository';
import { TypeOrmCategoryRepository } from '../repositories/typeorm-category.repository';
import { TypeOrmPointEarningRuleRepository } from '../repositories/typeorm-point-earning-rule.repository';
import { TypeOrmPointTransactionRepository } from '../repositories/typeorm-point-transaction.repository';
import { Customer } from '../domain/customer.entity';
import { LoyaltyAccount } from '../domain/loyalty-account.entity';
import { Product } from '../domain/product.entity';
import { Category } from '../domain/category.entity';
import { PointEarningRule } from '../domain/point-earning-rule.entity';
import { PointTransaction } from '../domain/point-transaction.entity';

/**
 * Provides dependency injection configurations for repository providers.
 */
export const repositoryProviders: Provider[] = [
  {
    provide: 'ICustomerRepository',
    useFactory: (dataSource: DataSource): TypeOrmCustomerRepository =>
      new TypeOrmCustomerRepository(
        dataSource.getRepository<Customer>(Customer),
      ),
    inject: [DataSource],
  },
  {
    provide: 'ILoyaltyAccountRepository',
    useFactory: (dataSource: DataSource): TypeOrmLoyaltyAccountRepository =>
      new TypeOrmLoyaltyAccountRepository(
        dataSource.getRepository<LoyaltyAccount>(LoyaltyAccount),
      ),
    inject: [DataSource],
  },
  {
    provide: 'IProductRepository',
    useFactory: (dataSource: DataSource): TypeOrmProductRepository =>
      new TypeOrmProductRepository(dataSource.getRepository<Product>(Product)),
    inject: [DataSource],
  },
  {
    provide: 'ICategoryRepository',
    useFactory: (dataSource: DataSource): TypeOrmCategoryRepository =>
      new TypeOrmCategoryRepository(
        dataSource.getRepository<Category>(Category),
      ),
    inject: [DataSource],
  },
  {
    provide: 'IPointEarningRuleRepository',
    useFactory: (dataSource: DataSource): TypeOrmPointEarningRuleRepository =>
      new TypeOrmPointEarningRuleRepository(
        dataSource.getRepository<PointEarningRule>(PointEarningRule),
      ),
    inject: [DataSource],
  },
  {
    provide: 'IPointTransactionRepository',
    useFactory: (dataSource: DataSource): TypeOrmPointTransactionRepository =>
      new TypeOrmPointTransactionRepository(
        dataSource.getRepository<PointTransaction>(PointTransaction),
      ),
    inject: [DataSource],
  },
];
