import { IsArray, IsNumber, ArrayMinSize } from 'class-validator';

/**
 * Data transfer object for initiating a checkout process.
 */
export class CheckoutDto {
  /**
   * An array of product IDs included in the checkout.
   * Each element in the array must be a number, and the array must contain at least one element.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  product_ids: number[];
}
