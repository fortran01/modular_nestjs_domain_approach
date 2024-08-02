import { LoyaltyAccount } from './loyalty-account.entity';
import { Product } from './product.entity';

/**
 * Represents a transaction where points are earned in a loyalty program.
 */
export class PointTransaction {
  /**
   * The unique identifier for the point transaction.
   */
  id: number;

  /**
   * The number of points earned in this transaction.
   */
  pointsEarned: number;

  /**
   * The date when the transaction occurred.
   */
  transactionDate: Date;

  /**
   * The loyalty account associated with this transaction.
   */
  loyaltyAccount: LoyaltyAccount;

  /**
   * The product associated with this transaction.
   */
  product: Product;
}
