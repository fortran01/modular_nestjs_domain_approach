import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';

/**
 * Interface for loyalty service operations.
 */
export interface ILoyaltyService {
  /**
   * Processes a checkout operation for a customer.
   * @param customerId The unique identifier of the customer.
   * @returns A promise that resolves to a CheckoutResponseDto object.
   */
  checkout(customerId: number): Promise<CheckoutResponseDto>;
}
