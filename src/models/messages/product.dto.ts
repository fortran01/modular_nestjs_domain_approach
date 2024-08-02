import { IsNumber, IsString, IsUrl, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

/**
 * Data transfer object representing a product.
 * This class is used to transfer product data in a structured format.
 */
@Exclude()
export class ProductDto {
  /**
   * The unique identifier for the product.
   * @type {number}
   */
  @Expose()
  @IsNumber()
  readonly id: number;

  /**
   * The name of the product.
   * @type {string}
   */
  @Expose()
  @IsString()
  readonly name: string;

  /**
   * The price of the product in cents to avoid floating point errors.
   * The price must be a non-negative number.
   * @type {number}
   */
  @Expose()
  @IsNumber()
  @Min(0)
  readonly price: number;

  /**
   * The URL of the product image.
   * @type {string}
   */
  @Expose()
  @IsUrl()
  readonly image_url: string;

  /**
   * The identifier for the category to which the product belongs.
   * @type {number}
   */
  @Expose()
  @IsNumber()
  readonly categoryId: number;

  /**
   * Constructor to allow partial initialization.
   * @param partial Partial object of ProductDto.
   *
   * Use Case:
   * This constructor is useful when you have partial data and need to create a
   * structured ProductDto object. For instance, when updating a product, you
   * can create a new ProductDto with only the changed fields.
   */
  constructor(partial: Partial<ProductDto>) {
    Object.assign(this, partial);
  }
}
