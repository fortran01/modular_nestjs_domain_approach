import { Category } from './category.entity';

/**
 * Represents a rule for earning points based on dollars spent within a specific category.
 */
export class PointEarningRule {
  /**
   * The unique identifier for the point earning rule.
   */
  id: number;

  /**
   * The number of points earned per dollar spent.
   */
  pointsPerDollar: number;

  /**
   * The start date from which the rule is applicable.
   */
  startDate: Date;

  /**
   * The optional end date after which the rule is no longer applicable.
   */
  endDate: Date;

  /**
   * The category associated with this point earning rule.
   */
  category: Category;

  /**
   * Determines if the rule is active on a given date.
   * @param date The date to check the rule's activity against.
   * @returns true if the rule is active on the given date, false otherwise.
   */
  isActive(date: Date): boolean {
    return this.startDate <= date && (!this.endDate || this.endDate >= date);
  }

  /**
   * Calculates the number of points earned based on the price.
   * @param price The price of the product.
   * @returns The number of points earned.
   */
  calculatePoints(price: number): number {
    return Math.floor(price * this.pointsPerDollar);
  }
}
