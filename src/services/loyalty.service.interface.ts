import { Product } from '../domain/product.entity';

/**
 * Interface for loyalty service operations.
 */
export interface ILoyaltyService {
  /**
   * Processes a checkout operation for a customer with specified product IDs.
   * @param customerId The unique identifier of the customer.
   * @param productIds An array of product IDs for checkout.
   * @returns A promise that resolves to a CheckoutResult object.
   */
  checkout(customerId: number, productIds: number[]): Promise<CheckoutResult>;

  /**
   * Calculates the loyalty points for a given product on a specific date.
   * @param product The product for which points are to be calculated.
   * @param date The date on which the calculation is performed.
   * @returns A promise that resolves to the number of points earned.
   */
  calculatePoints(product: Product, date: Date): Promise<number>;

  /**
   * Retrieves the total loyalty points accumulated by a customer.
   * @param customerId The unique identifier of the customer.
   * @returns A promise that resolves to the number of points.
   */
  getCustomerPoints(customerId: number): Promise<number>;
}

/**
 * Defines the structure of the checkout result.
 */
export interface CheckoutResult {
  /** The total number of points earned during the checkout. */
  total_points_earned: number;
  /** Array of product IDs that were invalid during checkout. */
  invalid_products: number[];
  /** Array of product IDs missing a category during checkout. */
  products_missing_category: number[];
  /** Array of product IDs for which point earning rules were missing. */
  point_earning_rules_missing: number[];
}
