import { Injectable, Inject } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { IProductRepository } from '../repositories/product.repository.interface';
import { ICategoryRepository } from '../repositories/category.repository.interface';
import { ProductDto } from '../models/messages/product.dto';
import { ProductMapper } from '../mappers/product.mapper';

/**
 * Service class for handling product-related operations.
 */
@Injectable()
export class ProductService implements IProductService {
  /**
   * Constructs a new instance of ProductService.
   * @param productRepository The repository handling product data.
   * @param categoryRepository The repository handling category data.
   */
  constructor(
    @Inject('IProductRepository')
    private productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  /**
   * Finds a product by its unique identifier.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the ProductDto or undefined if not found.
   */
  async findById(id: number): Promise<ProductDto | undefined> {
    const product = await this.productRepository.findById(id);
    return product ? ProductMapper.toDto(product) : undefined;
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of ProductDto.
   */
  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.findAll();
    return products.map((product) => ProductMapper.toDto(product));
  }

  /**
   * Creates a new product with the given data.
   * @param productDto The DTO for creating a new product.
   * @returns A promise that resolves to the newly created ProductDto.
   */
  async create(productDto: ProductDto): Promise<ProductDto> {
    const product = await ProductMapper.fromDto(
      productDto,
      this.categoryRepository,
    );
    const createdProduct = await this.productRepository.create(product);
    return ProductMapper.toDto(createdProduct);
  }

  /**
   * Updates an existing product with the given data.
   * @param id The unique identifier of the product to update.
   * @param productDto The DTO with new data for the product.
   * @returns A promise that resolves to the updated ProductDto.
   * @throws Error if the product is not found.
   */
  async update(id: number, productDto: ProductDto): Promise<ProductDto> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    const updatedProduct = await ProductMapper.fromDto(
      productDto,
      this.categoryRepository,
      existingProduct,
    );
    const savedProduct = await this.productRepository.update(updatedProduct);
    return ProductMapper.toDto(savedProduct);
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
