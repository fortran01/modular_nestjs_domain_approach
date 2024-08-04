import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCustomerDto {
  @Expose()
  @IsString({ message: 'Customer name must be a valid string.' })
  name: string;

  @Expose()
  @IsEmail({}, { message: 'Customer email must be a valid email address.' })
  email: string;

  constructor(partial: Partial<CreateCustomerDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UpdateCustomerDto {
  @Expose()
  @IsOptional()
  @IsString({ message: 'Customer name must be a valid string.' })
  name?: string;

  @Expose()
  @IsOptional()
  @IsEmail({}, { message: 'Customer email must be a valid email address.' })
  email?: string;

  constructor(partial: Partial<UpdateCustomerDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CustomerResponseDto {
  @Expose()
  @IsNumber({}, { message: 'Customer ID must be a valid number.' })
  id: number;

  @Expose()
  @IsString({ message: 'Customer name must be a valid string.' })
  name: string;

  @Expose()
  @IsEmail({}, { message: 'Customer email must be a valid email address.' })
  email: string;

  constructor(partial: Partial<CustomerResponseDto>) {
    Object.assign(this, partial);
  }
}
