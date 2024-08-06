// models/messages/add-to-cart.dto.ts

import { IsInt, IsPositive } from 'class-validator';

/**
 * Data Transfer Object for adding items to the shopping cart.
 */
export class AddToCartDto {
  /**
   * The unique identifier of the product to be added to the cart.
   * @type {number}
   */
  @IsInt({ message: 'Product ID must be an integer' })
  @IsPositive({ message: 'Product ID must be a positive number' })
  productId: number;

  /**
   * The quantity of the product to be added to the cart.
   * @type {number}
   */
  @IsInt({ message: 'Quantity must be an integer' })
  @IsPositive({ message: 'Quantity must be a positive number' })
  quantity: number;
}
