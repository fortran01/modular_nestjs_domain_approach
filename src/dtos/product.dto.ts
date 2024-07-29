import { IsNumber, IsString, IsUrl } from 'class-validator';

/**
 * Data transfer object representing a product.
 */
export class ProductDto {
  /**
   * The unique identifier for the product.
   * @type {number}
   */
  @IsNumber()
  id: number;

  /**
   * The name of the product.
   * @type {string}
   */
  @IsString()
  name: string;

  /**
   * The price of the product in cents to avoid floating point errors.
   * @type {number}
   */
  @IsNumber()
  price: number;

  /**
   * The URL of the product image.
   * @type {string}
   */
  @IsUrl()
  image_url: string;

  /**
   * The identifier for the category to which the product belongs.
   * @type {number}
   */
  @IsNumber()
  categoryId: number;
}
