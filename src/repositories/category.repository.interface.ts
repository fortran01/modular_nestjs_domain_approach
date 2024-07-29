import { Category } from '../domain/category.entity';

/**
 * Interface for category repository operations.
 */
export interface ICategoryRepository {
  /**
   * Finds a category by its ID.
   * @param id The unique identifier of the category.
   * @returns A promise that resolves to the Category or undefined if not found.
   */
  findById(id: number): Promise<Category | undefined>;

  /**
   * Retrieves all categories.
   * @returns A promise that resolves to an array of Category objects.
   */
  findAll(): Promise<Category[]>;

  /**
   * Finds categories with an active rule on a specific date.
   * @param date The date to check for active rules.
   * @returns A promise that resolves to an array of Category objects.
   */
  findWithActiveRule(date: Date): Promise<Category[]>;

  /**
   * Creates a new category.
   * @param category The category object to create.
   * @returns A promise that resolves to the created Category object.
   */
  create(category: Category): Promise<Category>;

  /**
   * Updates an existing category.
   * @param category The category object to update.
   * @returns A promise that resolves to the updated Category object.
   */
  update(category: Category): Promise<Category>;

  /**
   * Deletes a category by its ID.
   * @param id The unique identifier of the category to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
