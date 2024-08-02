import { IsNumber, IsString, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

/**
 * Data transfer object representing a customer.
 */
@Exclude()
export class CustomerDto {
  /**
   * The unique identifier for the customer.
   * @type {number}
   */
  @Expose()
  @IsNumber()
  readonly id: number;

  /**
   * The name of the customer.
   * @type {string}
   */
  @Expose()
  @IsString()
  readonly name: string;

  /**
   * The email address of the customer.
   * @type {string}
   */
  @Expose()
  @IsEmail()
  readonly email: string;

  /**
   * Constructor to allow partial initialization.
   * @param partial Partial object of CustomerDto.
   *
   * Use Case:
   * This constructor is useful when you have partial data and need to create a
   * structured CustomerDto object. For instance, when updating a customer, you
   * can create a new CustomerDto with only the changed fields.
   */
  constructor(partial: Partial<CustomerDto>) {
    Object.assign(this, partial);
  }
}
