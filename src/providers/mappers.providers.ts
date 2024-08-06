import { Provider } from '@nestjs/common';
import { PointTransactionMapper } from '../mappers/point-transaction.mapper';
import { PointEarningRuleMapper } from '../mappers/point-earning-rule.mapper';
import { ProductMapper } from '../mappers/product.mapper';
import { LoyaltyAccountMapper } from '../mappers/loyalty-account.mapper';
import { CustomerMapper } from '../mappers/customer.mapper';
import { CategoryMapper } from '../mappers/category.mapper';
import { ShoppingCartMapper } from '../mappers/shopping-cart.mapper';
/**
 * Defines the providers for various data mappers in the application.
 * Each provider is associated with a specific mapper class.
 * @type {Provider[]} - Array of providers configured for dependency injection.
 */
export const mapperProviders: Provider[] = [
  {
    /**
     * Provider configuration for the PointTransactionMapper.
     * @type {Provider}
     */
    provide: 'PointTransactionMapper',
    useClass: PointTransactionMapper,
  },
  {
    /**
     * Provider configuration for the PointEarningRuleMapper.
     * @type {Provider}
     */
    provide: 'PointEarningRuleMapper',
    useClass: PointEarningRuleMapper,
  },
  {
    /**
     * Provider configuration for the ProductMapper.
     * @type {Provider}
     */
    provide: 'ProductMapper',
    useClass: ProductMapper,
  },
  {
    /**
     * Provider configuration for the LoyaltyAccountMapper.
     * @type {Provider}
     */
    provide: 'LoyaltyAccountMapper',
    useClass: LoyaltyAccountMapper,
  },
  {
    /**
     * Provider configuration for the CustomerMapper.
     * @type {Provider}
     */
    provide: 'CustomerMapper',
    useClass: CustomerMapper,
  },
  {
    /**
     * Provider configuration for the CategoryMapper.
     * @type {Provider}
     */
    provide: 'CategoryMapper',
    useClass: CategoryMapper,
  },
  {
    /**
     * Provider configuration for the ShoppingCartMapper.
     * @type {Provider}
     */
    provide: 'ShoppingCartMapper',
    useClass: ShoppingCartMapper,
  },
];
