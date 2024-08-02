import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';

/**
 * Interface for loyalty service operations.
 */
export interface ILoyaltyService {
  /**
   * Processes a checkout operation for a customer with specified product IDs.
   * @param customerId The unique identifier of the customer.
   * @param productIds An array of product IDs for checkout.
   * @returns A promise that resolves to a CheckoutResponseDto object.
   */
  checkout(
    customerId: number,
    productIds: number[],
  ): Promise<CheckoutResponseDto>;
}
