import { Injectable, Inject } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { IProductRepository } from '../repositories/product.repository.interface';
import { ICategoryRepository } from '../repositories/category.repository.interface';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
} from '../models/messages/product.dto';
import { ProductMapper } from '../mappers/product.mapper';
import { Product } from '../models/domain/product.entity';

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
   * @returns A promise that resolves to the ProductResponseDto or undefined if not found.
   */
  async findById(id: number): Promise<ProductResponseDto | undefined> {
    const product = await this.productRepository.findById(id);
    return product ? ProductMapper.toDto(product) : undefined;
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of ProductResponseDto.
   */
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAll();
    return products.map((product) => ProductMapper.toDto(product));
  }

  /**
   * Creates a new product with the given data.
   * @param productDto A CreateProductDto object containing data for the new product.
   * @returns A promise that resolves to the newly created ProductResponseDto.
   */
  async create(productDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = new Product();
    product.name = productDto.name;
    product.price = productDto.price;
    product.image_url = productDto.image_url;
    product.category = await this.categoryRepository.findById(
      productDto.categoryId,
    );

    const createdProduct = await this.productRepository.create(product);
    return ProductMapper.toDto(createdProduct);
  }

  /**
   * Updates an existing product with the given data.
   * @param id The unique identifier of the product to update.
   * @param productDto An UpdateProductDto object containing new data for the product.
   * @returns A promise that resolves to the updated ProductResponseDto.
   * @throws Error if the product is not found.
   */
  async update(
    id: number,
    productDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    Object.assign(existingProduct, productDto);
    const updatedProduct = await this.productRepository.update(existingProduct);
    return ProductMapper.toDto(updatedProduct);
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
