import { IsNumber, IsString, IsUrl, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

/**
 * Represents the data transfer object for product information.
 * This class is utilized to encapsulate and transfer product data in a structured manner.
 */
@Exclude()
export class ProductDto {
  /**
   * The unique identifier for the product.
   * @type {number}
   * @Expose() - Makes this property visible during class transformation.
   * @IsNumber() - Ensures the property value is a number.
   */
  @Expose()
  @IsNumber({}, { message: 'Product ID must be a valid number.' })
  readonly id: number;

  /**
   * The name of the product.
   * @type {string}
   * @Expose() - Makes this property visible during class transformation.
   * @IsString() - Ensures the property value is a string.
   */
  @Expose()
  @IsString({ message: 'Product name must be a valid string.' })
  readonly name: string;

  /**
   * The price of the product in cents, used to avoid floating point errors.
   * The price must be a non-negative number.
   * @type {number}
   * @Expose() - Makes this property visible during class transformation.
   * @IsNumber() - Ensures the property value is a number.
   * @Min(0) - Ensures the price is not negative.
   */
  @Expose()
  @IsNumber({}, { message: 'Product price must be a valid number.' })
  @Min(0, { message: 'Product price cannot be negative.' })
  readonly price: number;

  /**
   * The URL of the product image.
   * @type {string}
   * @Expose() - Makes this property visible during class transformation.
   * @IsUrl() - Ensures the property value is a valid URL.
   */
  @Expose()
  @IsUrl({}, { message: 'Product image URL must be a valid URL.' })
  readonly image_url: string;

  /**
   * The identifier for the category to which the product belongs.
   * @type {number}
   * @Expose() - Makes this property visible during class transformation.
   * @IsNumber() - Ensures the property value is a number.
   */
  @Expose()
  @IsNumber({}, { message: 'Category ID must be a valid number.' })
  readonly categoryId: number;

  /**
   * Constructor to allow partial initialization of the ProductDto class.
   * This is useful for creating instances of ProductDto with partial data, particularly useful in update scenarios.
   * @param partial A partial object of ProductDto to allow partial updates.
   */
  constructor(partial: Partial<ProductDto>) {
    Object.assign(this, partial);
  }
}
