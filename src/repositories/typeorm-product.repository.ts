import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/domain/product.entity';
import { ProductTable } from '../models/database/product.table';
import { ProductMapper } from '../mappers/product.mapper';
import { IProductRepository } from './product.repository.interface';

/**
 * Injectable class to handle operations for Product entities using TypeORM.
 */
@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  /**
   * Repository for handling ProductTable entities.
   * @param productRepository Injected repository for ProductTable.
   */
  constructor(
    @InjectRepository(ProductTable)
    private productRepository: Repository<ProductTable>,
  ) {}

  /**
   * Finds a product by its ID.
   * @param id The unique identifier of the product.
   * @returns A promise that resolves to the Product or undefined if not found.
   */
  async findById(id: number): Promise<Product | undefined> {
    const productTable = await this.productRepository.findOne({
      where: { id },
      relations: ['category'], // This line ensures the category relation is loaded
    });
    return productTable ? ProductMapper.toDomain(productTable) : undefined;
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product entities.
   */
  async findAll(): Promise<Product[]> {
    const productTables = await this.productRepository.find();
    return productTables.map(ProductMapper.toDomain);
  }

  /**
   * Finds products by their associated category ID.
   * @param categoryId The unique identifier of the category.
   * @returns A promise that resolves to an array of Product entities.
   */
  async findByCategory(categoryId: number): Promise<Product[]> {
    const productTables = await this.productRepository.find({
      where: { category: { id: categoryId } },
    });
    return productTables.map(ProductMapper.toDomain);
  }

  /**
   * Creates a new product in the repository.
   * @param product The Product object to create.
   * @returns A promise that resolves to the newly created Product.
   */
  async create(product: Product): Promise<Product> {
    const productTable = ProductMapper.toPersistence(product);
    const savedProductTable = await this.productRepository.save(productTable);
    return ProductMapper.toDomain(savedProductTable);
  }

  /**
   * Updates an existing product in the repository.
   * @param product The Product object to update.
   * @returns A promise that resolves to the updated Product.
   */
  async update(product: Product): Promise<Product> {
    const productTable = ProductMapper.toPersistence(product);
    await this.productRepository.update(productTable.id, productTable);
    return ProductMapper.toDomain(productTable);
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
