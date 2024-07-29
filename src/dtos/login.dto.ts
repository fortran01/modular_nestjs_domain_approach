import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for user login.
 */
export class LoginDto {
  /**
   * The customer identifier as a string.
   * It must not be empty.
   */
  @IsString()
  @IsNotEmpty()
  customer_id: string;
}
