import { Provider } from '@nestjs/common';
import { LoyaltyService } from '../services/loyalty.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

/**
 * Defines an array of service providers for dependency injection within the application.
 * Each entry in the array specifies a service class to be instantiated when requested.
 * @type {Provider[]} - Array of providers configured for dependency injection.
 */
export const serviceProviders: Provider[] = [
  {
    /**
     * Provider configuration for the LoyaltyService.
     * @type {Provider}
     */
    provide: LoyaltyService,
    useClass: LoyaltyService,
  },
  {
    /**
     * Provider configuration for the CustomerService.
     * @type {Provider}
     */
    provide: CustomerService,
    useClass: CustomerService,
  },
  {
    /**
     * Provider configuration for the ProductService.
     * @type {Provider}
     */
    provide: ProductService,
    useClass: ProductService,
  },
  {
    /**
     * Provider configuration for the ShoppingCartService.
     * @type {Provider}
     */
    provide: ShoppingCartService,
    useClass: ShoppingCartService,
  },
];
