import { IsNumber, IsArray } from 'class-validator';

/**
 * Data transfer object representing the result of a checkout process.
 */
export class CheckoutResultDto {
  /**
   * The total number of points earned in the checkout process.
   */
  @IsNumber()
  totalPointsEarned: number;

  /**
   * Array of product IDs that were identified as invalid during the checkout.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  invalidProducts: number[];

  /**
   * Array of product IDs that are missing a category association.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  productsMissingCategory: number[];

  /**
   * Array of product IDs for which point earning rules are missing.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  pointEarningRulesMissing: number[];
}
