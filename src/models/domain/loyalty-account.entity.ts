import { Customer } from './customer.entity';
import { PointTransaction } from './point-transaction.entity';

/**
 * Represents a loyalty account associated with a customer.
 */
export class LoyaltyAccount {
  /**
   * The unique identifier for the loyalty account.
   */
  id: number;

  /**
   * The total points accumulated in the loyalty account.
   */
  points: number = 0;

  /**
   * The customer associated with this loyalty account.
   */
  customer: Customer;

  /**
   * The collection of point transactions associated with this loyalty account.
   */
  transactions: PointTransaction[];

  /**
   * Timestamp of the last update to the loyalty account.
   */
  lastUpdated: Date;

  /**
   * Adds a specified number of points to the loyalty account.
   * @param points The number of points to add.
   */
  addPoints(points: number): void {
    this.points += points;
  }

  /**
   * Deducts a specified number of points from the loyalty account if enough points are available.
   * @param points The number of points to deduct.
   * @returns true if the points were deducted successfully, false otherwise.
   */
  deductPoints(points: number): boolean {
    if (this.points >= points) {
      this.points -= points;
      return true;
    }
    return false;
  }

  /**
   * Calculates the total points earned from all transactions.
   * @returns The total points earned.
   */
  calculateTotalPoints(): number {
    return this.transactions.reduce(
      (total, transaction) => total + transaction.pointsEarned,
      0,
    );
  }

  /**
   * Checks if the account has enough points to cover a specified amount.
   * @param requiredPoints The number of points required.
   * @returns true if the account has enough points, false otherwise.
   */
  hasEnoughPoints(requiredPoints: number): boolean {
    return this.points >= requiredPoints;
  }

  /**
   * Retrieves the total points in the loyalty account.
   * @returns The total points in the loyalty account.
   */
  getPoints(): number {
    return this.points;
  }

  /**
   * Custom method to exclude the lastUpdated field from serialization.
   * @returns The serialized entity object without the lastUpdated field.
   */
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { lastUpdated, ...rest } = this;
    return rest;
  }
}
