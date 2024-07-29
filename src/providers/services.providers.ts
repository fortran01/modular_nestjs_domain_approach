import { Provider } from '@nestjs/common';
import { LoyaltyService } from '../services/loyalty.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';

/**
 * Array of service providers for dependency injection.
 * Each service is provided with its respective class.
 */
export const serviceProviders: Provider[] = [
  {
    provide: LoyaltyService,
    useClass: LoyaltyService,
  },
  {
    provide: CustomerService,
    useClass: CustomerService,
  },
  {
    provide: ProductService,
    useClass: ProductService,
  },
];
