import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

/**
 * Represents the data transfer object for creating a new category.
 */
export class CreateCategoryDto {
  /**
   * The name of the category to be created.
   * This field is required and must be a string.
   *
   * @type {string}
   */
  @IsNotEmpty({ message: 'Category name is required.' })
  @IsString({ message: 'Category name must be a string.' })
  name: string;
}

/**
 * Represents the data transfer object for updating an existing category.
 */
export class UpdateCategoryDto {
  /**
   * The new name for the category, which is optional.
   * If provided, it must be a string.
   *
   * @type {string | undefined}
   */
  @IsOptional()
  @IsString({ message: 'Category name must be a string.' })
  name?: string;
}

/**
 * Represents the data transfer object for the response of category operations.
 */
export class CategoryResponseDto {
  /**
   * The unique identifier of the category.
   * This field must be an integer and cannot be less than 1.
   *
   * @type {number}
   */
  @IsInt({ message: 'Category ID must be an integer.' })
  @Min(1, { message: 'Category ID must be at least 1.' })
  id: number;

  /**
   * The name of the category.
   * This field is required to be a string.
   *
   * @type {string}
   */
  @IsString({ message: 'Category name must be a string.' })
  name: string;
}
