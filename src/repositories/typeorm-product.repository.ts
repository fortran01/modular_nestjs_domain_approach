import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../domain/product.entity';
import { IProductRepository } from './product.repository.interface';

/**
 * Injectable class to handle operations for Product entities using TypeORM.
 */
@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  /**
   * Repository for handling Product entities.
   * @param productRepository Injected repository for Product.
   */
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * Finds a product by its ID.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the Product or undefined if not found.
   */
  async findById(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id } });
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product entities.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * Finds products by their associated category ID.
   * @param categoryId The unique identifier of the category.
   * @returns A promise that resolves to an array of Product entities.
   */
  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { categoryId: categoryId },
    });
  }

  /**
   * Creates a new product in the repository.
   * @param product The Product object to create.
   * @returns A promise that resolves to the newly created Product.
   */
  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  /**
   * Updates an existing product in the repository.
   * @param product The Product object to update.
   * @returns A promise that resolves to the updated Product.
   */
  async update(product: Product): Promise<Product> {
    await this.productRepository.update(product.id, product);
    return product;
  }

  /**
   * Deletes a product from the repository by its ID.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
