// models/messages/update-cart-item.dto.ts

import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for updating the quantity of an item in the shopping cart.
 */
export class UpdateCartItemDto {
  /**
   * The new quantity for the cart item.
   * @type {number}
   * @remarks
   * The quantity must be an integer and cannot be less than zero.
   */
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(0, { message: 'Quantity must be zero or greater' })
  @Type(() => Number)
  quantity: number;
}
