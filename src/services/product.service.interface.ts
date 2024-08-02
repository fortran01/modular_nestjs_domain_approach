import { ProductDto } from '../models/messages/product.dto';

/**
 * Interface for product service operations.
 */
export interface IProductService {
  /**
   * Finds a product by its unique identifier.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the ProductDto or undefined if not found.
   */
  findById(id: number): Promise<ProductDto | undefined>;

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of ProductDto.
   */
  findAll(): Promise<ProductDto[]>;

  /**
   * Creates a new product with the given data.
   * @param productDto A ProductDto object containing data for the new product.
   * @returns A promise that resolves to the newly created ProductDto.
   */
  create(productDto: ProductDto): Promise<ProductDto>;

  /**
   * Updates an existing product with the given data.
   * @param id The unique identifier of the product to update.
   * @param productDto A ProductDto object containing new data for the product.
   * @returns A promise that resolves to the updated ProductDto.
   */
  update(id: number, productDto: ProductDto): Promise<ProductDto>;

  /**
   * Deletes a product by its unique identifier.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
