import { IsNumber, IsArray } from 'class-validator';

/**
 * Data transfer object representing the result of a checkout process.
 */
export class CheckoutResultDto {
  /**
   * The total number of points earned in the checkout process.
   */
  @IsNumber()
  total_points_earned: number;

  /**
   * Array of product IDs that were identified as invalid during the checkout.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  invalid_products: number[];

  /**
   * Array of product IDs that are missing a category association.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  products_missing_category: number[];

  /**
   * Array of product IDs for which point earning rules are missing.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  point_earning_rules_missing: number[];
}
