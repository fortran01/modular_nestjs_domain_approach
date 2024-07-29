import { Product } from '../domain/product.entity';

/**
 * Interface for product repository operations.
 */
export interface IProductRepository {
  /**
   * Finds a product by its ID.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the Product or undefined if not found.
   */
  findById(id: number): Promise<Product | undefined>;

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product objects.
   */
  findAll(): Promise<Product[]>;

  /**
   * Finds products by their category ID.
   * @param categoryId The unique identifier of the category.
   * @returns A promise that resolves to an array of Product objects.
   */
  findByCategory(categoryId: number): Promise<Product[]>;

  /**
   * Creates a new product in the repository.
   * @param product The Product object to create.
   * @returns A promise that resolves to the newly created Product.
   */
  create(product: Product): Promise<Product>;

  /**
   * Updates an existing product in the repository.
   * @param product The Product object to update.
   * @returns A promise that resolves to the updated Product.
   */
  update(product: Product): Promise<Product>;

  /**
   * Deletes a product from the repository by its ID.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
