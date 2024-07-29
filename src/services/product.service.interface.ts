import { Product } from '../domain/product.entity';

/**
 * Interface for product service operations.
 */
export interface IProductService {
  /**
   * Finds a product by its unique identifier.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the Product or undefined if not found.
   */
  findById(id: number): Promise<Product | undefined>;

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product entities.
   */
  findAll(): Promise<Product[]>;

  /**
   * Creates a new product with the given data.
   * @param product A partial product object containing data for the new product.
   * @returns A promise that resolves to the newly created Product.
   */
  create(product: Partial<Product>): Promise<Product>;

  /**
   * Updates an existing product with the given data.
   * @param id The unique identifier of the product to update.
   * @param productData A partial product object containing data to update.
   * @returns A promise that resolves to the updated Product.
   */
  update(id: number, productData: Partial<Product>): Promise<Product>;

  /**
   * Deletes a product by its unique identifier.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
