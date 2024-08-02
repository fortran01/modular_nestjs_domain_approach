import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;
}

export class CategoryResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  name: string;
}
