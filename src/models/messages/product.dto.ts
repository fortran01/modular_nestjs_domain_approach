import { IsNumber, IsString, IsUrl, Min, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateProductDto {
  @Expose()
  @IsString({ message: 'Product name must be a valid string.' })
  name: string;

  @Expose()
  @IsNumber({}, { message: 'Product price must be a valid number.' })
  @Min(0, { message: 'Product price cannot be negative.' })
  price: number;

  @Expose()
  @IsUrl({}, { message: 'Product image URL must be a valid URL.' })
  image_url: string;

  @Expose()
  @IsNumber({}, { message: 'Category ID must be a valid number.' })
  categoryId: number;

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UpdateProductDto {
  @Expose()
  @IsOptional()
  @IsString({ message: 'Product name must be a valid string.' })
  name?: string;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: 'Product price must be a valid number.' })
  @Min(0, { message: 'Product price cannot be negative.' })
  price?: number;

  @Expose()
  @IsOptional()
  @IsUrl({}, { message: 'Product image URL must be a valid URL.' })
  image_url?: string;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: 'Category ID must be a valid number.' })
  categoryId?: number;

  constructor(partial: Partial<UpdateProductDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ProductResponseDto {
  @Expose()
  @IsNumber({}, { message: 'Product ID must be a valid number.' })
  id: number;

  @Expose()
  @IsString({ message: 'Product name must be a valid string.' })
  name: string;

  @Expose()
  @IsNumber({}, { message: 'Product price must be a valid number.' })
  price: number;

  @Expose()
  @IsUrl({}, { message: 'Product image URL must be a valid URL.' })
  image_url: string;

  @Expose()
  @IsNumber({}, { message: 'Category ID must be a valid number.' })
  categoryId: number;

  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}
