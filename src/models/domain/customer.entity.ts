import { LoyaltyAccount } from './loyalty-account.entity';

/**
 * Represents a customer in the system.
 */
export class Customer {
  /**
   * The unique identifier for the customer.
   */
  id: number;

  /**
   * The name of the customer.
   */
  name: string;

  /**
   * The email address of the customer.
   */
  email: string;

  /**
   * The loyalty account associated with the customer.
   */
  loyaltyAccount: LoyaltyAccount;
}
