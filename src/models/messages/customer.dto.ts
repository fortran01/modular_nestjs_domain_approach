import { IsNumber, IsString, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

/**
 * Represents the data transfer object for customer details.
 * @Exclude() - Excludes all properties from the class that are not explicitly exposed using @Expose().
 */
@Exclude()
export class CustomerDto {
  /**
   * The unique identifier for the customer.
   * @type {number}
   * @Expose() - Makes this property visible during class transformation.
   * @IsNumber() - Ensures the property value is a number.
   */
  @Expose()
  @IsNumber({}, { message: 'Customer ID must be a valid number.' })
  readonly id: number;

  /**
   * The name of the customer.
   * @type {string}
   * @Expose() - Makes this property visible during class transformation.
   * @IsString() - Ensures the property value is a string.
   */
  @Expose()
  @IsString({ message: 'Customer name must be a valid string.' })
  readonly name: string;

  /**
   * The email address of the customer.
   * @type {string}
   * @Expose() - Makes this property visible during class transformation.
   * @IsEmail() - Ensures the property value is a valid email address.
   */
  @Expose()
  @IsEmail({}, { message: 'Customer email must be a valid email address.' })
  readonly email: string;

  /**
   * Constructor to allow partial initialization of the CustomerDto class.
   * This is useful for creating instances of CustomerDto with partial data, particularly useful in update scenarios.
   * @param partial A partial object of CustomerDto to allow partial updates.
   */
  constructor(partial: Partial<CustomerDto>) {
    Object.assign(this, partial);
  }
}
