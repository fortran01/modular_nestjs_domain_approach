import { IsNumber, IsString, IsEmail } from 'class-validator';

/**
 * Data transfer object representing a customer.
 */
export class CustomerDto {
  /**
   * The unique identifier for the customer.
   * @type {number}
   */
  @IsNumber()
  id: number;

  /**
   * The name of the customer.
   * @type {string}
   */
  @IsString()
  name: string;

  /**
   * The email address of the customer.
   * @type {string}
   */
  @IsEmail()
  email: string;
}
