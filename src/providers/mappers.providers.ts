import { Provider } from '@nestjs/common';
import { PointTransactionMapper } from '../mappers/point-transaction.mapper';
import { PointEarningRuleMapper } from '../mappers/point-earning-rule.mapper';
import { ProductMapper } from '../mappers/product.mapper';
import { LoyaltyAccountMapper } from '../mappers/loyalty-account.mapper';
import { CustomerMapper } from '../mappers/customer.mapper';
import { CategoryMapper } from '../mappers/category.mapper';

export const mapperProviders: Provider[] = [
  {
    provide: 'PointTransactionMapper',
    useClass: PointTransactionMapper,
  },
  {
    provide: 'PointEarningRuleMapper',
    useClass: PointEarningRuleMapper,
  },
  {
    provide: 'ProductMapper',
    useClass: ProductMapper,
  },
  {
    provide: 'LoyaltyAccountMapper',
    useClass: LoyaltyAccountMapper,
  },
  {
    provide: 'CustomerMapper',
    useClass: CustomerMapper,
  },
  {
    provide: 'CategoryMapper',
    useClass: CategoryMapper,
  },
];
