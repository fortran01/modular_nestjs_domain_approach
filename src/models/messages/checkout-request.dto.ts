import { IsArray, IsNumber, ArrayMinSize } from 'class-validator';

/**
 * Data transfer object for a checkout request.
 */
export class CheckoutRequestDto {
  /**
   * An array of product IDs included in the checkout request.
   * Each element in the array must be a number, and the array must contain at least one element.
   */
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  readonly product_ids: number[];
}
