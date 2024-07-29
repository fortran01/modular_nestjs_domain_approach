import { Injectable, Inject } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { IProductRepository } from '../repositories/product.repository.interface';
import { Product } from '../domain/product.entity';

/**
 * Service class for handling product-related operations.
 */
@Injectable()
export class ProductService implements IProductService {
  /**
   * Constructs a new instance of ProductService.
   * @param productRepository The repository handling product data.
   */
  constructor(
    @Inject('IProductRepository')
    private productRepository: IProductRepository,
  ) {}

  /**
   * Finds a product by its unique identifier.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the Product or undefined if not found.
   */
  async findById(id: number): Promise<Product | undefined> {
    return this.productRepository.findById(id);
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product entities.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  /**
   * Creates a new product with the given data.
   * @param productData A partial product object containing data for the new product.
   * @returns A promise that resolves to the newly created Product.
   */
  async create(productData: Partial<Product>): Promise<Product> {
    const product = new Product();
    Object.assign(product, productData);
    return this.productRepository.create(product);
  }

  /**
   * Updates an existing product with the given data.
   * @param id The unique identifier of the product to update.
   * @param productData A partial product object containing data to update.
   * @returns A promise that resolves to the updated Product.
   * @throws Error if the product is not found.
   */
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, productData);
    return this.productRepository.update(product);
  }

  /**
   * Deletes a product by its unique identifier.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
