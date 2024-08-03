import { IsArray, IsNumber, ArrayMinSize } from 'class-validator';

/**
 * Data transfer object for a checkout request.
 * This object is used to encapsulate the data received from a client when they initiate a checkout process.
 */
export class CheckoutRequestDto {
  /**
   * An array of product IDs included in the checkout request.
   * Each element in the array must be a number, and the array must contain at least one element.
   * @type {number[]} - Array of integers representing product IDs.
   */
  @IsArray({ message: 'Product IDs must be provided as an array.' })
  @IsNumber({}, { each: true, message: 'Each product ID must be a number.' })
  @ArrayMinSize(1, { message: 'At least one product ID is required.' })
  readonly product_ids: number[];
}
