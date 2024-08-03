import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Represents the data transfer object for user login.
 * This class encapsulates the user data necessary for login authentication.
 */
export class LoginDto {
  /**
   * The unique identifier for the customer, used for authentication.
   * This field is a string and must not be empty.
   *
   * @type {string}
   * @IsString() Ensures the property value is a string.
   * @IsNotEmpty() Ensures the property is not empty.
   */
  @IsString({ message: 'Customer ID must be a string.' })
  @IsNotEmpty({ message: 'Customer ID is required.' })
  customer_id: string;
}
