import { IsNumber, IsArray } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

/**
 * Represents the data transfer object for the response of a checkout operation.
 * This class is used to encapsulate the results of a checkout process, including points earned and any product validation issues.
 *
 * @Exclude() Excludes all properties from the class that are not explicitly exposed using @Expose().
 */
@Exclude()
export class CheckoutResponseDto {
  /**
   * Represents the total points earned during the checkout process.
   *
   * @type {number}
   * @Expose() Makes this property visible during class transformation.
   * @IsNumber() Ensures the property value is a number.
   */
  @Expose()
  @IsNumber({}, { message: 'Total points earned must be a number.' })
  readonly total_points_earned: number;

  /**
   * Contains an array of product IDs that were identified as invalid during the checkout process.
   *
   * @type {number[]}
   * @Expose() Makes this property visible during class transformation.
   * @IsArray() Ensures the property value is an array.
   * @IsNumber({}, { each: true }) Ensures each element in the array is a number.
   */
  @Expose()
  @IsArray({ message: 'Invalid products must be an array.' })
  @IsNumber({}, { each: true, message: 'Each product ID must be a number.' })
  readonly invalid_products: number[];

  /**
   * Contains an array of product IDs that are missing a category assignment.
   *
   * @type {number[]}
   * @Expose() Makes this property visible during class transformation.
   * @IsArray() Ensures the property value is an array.
   * @IsNumber({}, { each: true }) Ensures each element in the array is a number.
   */
  @Expose()
  @IsArray({ message: 'Products missing category must be an array.' })
  @IsNumber({}, { each: true, message: 'Each product ID must be a number.' })
  readonly products_missing_category: number[];

  /**
   * Contains an array of product IDs for which point earning rules are missing.
   *
   * @type {number[]}
   * @Expose() Makes this property visible during class transformation.
   * @IsArray() Ensures the property value is an array.
   * @IsNumber({}, { each: true }) Ensures each element in the array is a number.
   */
  @Expose()
  @IsArray({ message: 'Point earning rules missing must be an array.' })
  @IsNumber({}, { each: true, message: 'Each product ID must be a number.' })
  readonly point_earning_rules_missing: number[];

  /**
   * Constructor to allow partial initialization of the CheckoutResponseDto class.
   * This is useful for creating instances of CheckoutResponseDto with partial data, particularly useful in update scenarios.
   *
   * @param partial A partial object of CheckoutResponseDto to allow partial updates.
   */
  constructor(partial: Partial<CheckoutResponseDto>) {
    Object.assign(this, partial);
  }
}
