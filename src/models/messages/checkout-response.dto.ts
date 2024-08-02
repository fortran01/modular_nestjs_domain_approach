import { IsNumber, IsArray } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

/**
 * Data transfer object for the response of a checkout operation.
 * @Exclude() Decorator to exclude all properties from the class that are not explicitly exposed.
 */
@Exclude()
export class CheckoutResponseDto {
  /**
   * The total points earned during the checkout process.
   * @type {number}
   * @Expose() Decorator to expose this property for transformation.
   * @IsNumber() Validates that the value is a number.
   */
  @Expose()
  @IsNumber()
  readonly total_points_earned: number;

  /**
   * Array of product IDs that were found to be invalid during the checkout.
   * @type {number[]}
   * @Expose() Decorator to expose this property for transformation.
   * @IsArray() Validates that the value is an array.
   * @IsNumber({}, { each: true }) Validates that each element in the array is a number.
   */
  @Expose()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly invalid_products: number[];

  /**
   * Array of product IDs missing a category assignment.
   * @type {number[]}
   * @Expose() Decorator to expose this property for transformation.
   * @IsArray() Validates that the value is an array.
   * @IsNumber({}, { each: true }) Validates that each element in the array is a number.
   */
  @Expose()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly products_missing_category: number[];

  /**
   * Array of product IDs for which point earning rules are missing.
   * @type {number[]}
   * @Expose() Decorator to expose this property for transformation.
   * @IsArray() Validates that the value is an array.
   * @IsNumber({}, { each: true }) Validates that each element in the array is a number.
   */
  @Expose()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly point_earning_rules_missing: number[];

  /**
   * Constructor to allow partial initialization of the CheckoutResponseDto class.
   * @param partial Partial object of CheckoutResponseDto to allow partial updates.
   *
   * Use Case:
   * This constructor is useful when you have partial data and need to create a
   * structured CheckoutResponseDto object. For instance, when updating you
   * can create a new ProductDto with only the changed fields.
   */
  constructor(partial: Partial<CheckoutResponseDto>) {
    Object.assign(this, partial);
  }
}
