import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
} from '../models/messages/product.dto';

/**
 * Interface for product service operations.
 */
export interface IProductService {
  /**
   * Finds a product by its unique identifier.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the ProductResponseDto or undefined if not found.
   */
  findById(id: number): Promise<ProductResponseDto | undefined>;

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of ProductResponseDto.
   */
  findAll(): Promise<ProductResponseDto[]>;

  /**
   * Creates a new product with the given data.
   * @param productDto A CreateProductDto object containing data for the new product.
   * @returns A promise that resolves to the newly created ProductResponseDto.
   */
  create(productDto: CreateProductDto): Promise<ProductResponseDto>;

  /**
   * Updates an existing product with the given data.
   * @param id The unique identifier of the product to update.
   * @param productDto An UpdateProductDto object containing new data for the product.
   * @returns A promise that resolves to the updated ProductResponseDto.
   */
  update(id: number, productDto: UpdateProductDto): Promise<ProductResponseDto>;

  /**
   * Deletes a product by its unique identifier.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
