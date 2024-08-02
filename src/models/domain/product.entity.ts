import { Category } from './category.entity';
import { PointTransaction } from './point-transaction.entity';

/**
 * Represents a product in the system.
 */
export class Product {
  /**
   * The unique identifier for the product.
   */
  id: number;

  /**
   * The name of the product.
   */
  name: string;

  /**
   * The price of the product in decimal format.
   */
  price: number;

  /**
   * The URL of the product image.
   */
  image_url: string;

  /**
   * The category to which the product belongs.
   */
  category: Category;

  /**
   * The collection of point transactions associated with this product.
   */
  transactions: PointTransaction[];

  /**
   * Calculates the number of points earned from purchasing this product.
   * @param pointsPerDollar The number of points earned per dollar spent.
   * @returns The total points as an integer.
   */
  calculatePoints(pointsPerDollar: number): number {
    return Math.floor(this.price * pointsPerDollar);
  }

  /**
   * Determines if the product is eligible for earning points.
   * @returns true if the product is eligible, false otherwise.
   */
  isEligibleForPoints(): boolean {
    return this.price > 0 && !!this.category;
  }
}
