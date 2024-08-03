import { Product } from '../models/domain/product.entity';
import { ProductTable } from '../models/database/product.table';
import { ProductDto } from '../models/messages/product.dto';
import { CategoryMapper } from './category.mapper';
import { PointTransactionMapper } from './point-transaction.mapper';
import { ICategoryRepository } from '../repositories/category.repository.interface';

/**
 * Mapper class for converting Product data between various forms.
 */
export class ProductMapper {
  /**
   * Converts a ProductTable database object to a Product domain model.
   * @param productTable - The ProductTable object from the database.
   * @returns The Product domain model.
   */
  static toDomain(productTable: ProductTable): Product {
    const product: Product = new Product();
    product.id = productTable.id;
    product.name = productTable.name;
    product.price = productTable.price;
    product.image_url = productTable.image_url;
    product.category = productTable.category
      ? CategoryMapper.toDomain(productTable.category)
      : null;
    product.transactions = productTable.transactions
      ? productTable.transactions.map((transaction) =>
          PointTransactionMapper.toDomain(transaction),
        )
      : [];
    return product;
  }

  /**
   * Creates or updates a Product domain model from a ProductDto.
   * @param productDto - The DTO containing product data.
   * @param categoryRepository - Repository to fetch category data.
   * @param existingProduct - Optional existing product for updates.
   * @returns A promise containing the Product domain model.
   */
  static async fromDto(
    productDto: ProductDto,
    categoryRepository: ICategoryRepository,
    existingProduct?: Product,
  ): Promise<Product> {
    const product: Product = existingProduct || new Product();
    product.id = productDto.id;
    product.name = productDto.name;
    product.price = productDto.price;
    product.image_url = productDto.image_url;

    if (productDto.categoryId) {
      const categoryTable = await categoryRepository.findById(
        productDto.categoryId,
      );
      product.category = categoryTable
        ? CategoryMapper.toDomain(categoryTable)
        : null;
    } else {
      product.category = null;
    }

    return product;
  }

  /**
   * Converts a Product domain model to a ProductTable for persistence.
   * @param product - The Product domain model.
   * @returns The ProductTable database object.
   */
  static toPersistence(product: Product): ProductTable {
    const productTable: ProductTable = new ProductTable();
    productTable.id = product.id;
    productTable.name = product.name;
    productTable.price = product.price;
    productTable.image_url = product.image_url;
    productTable.category = product.category
      ? CategoryMapper.toPersistence(product.category)
      : null;
    productTable.transactions = product.transactions
      ? product.transactions.map((transaction) =>
          PointTransactionMapper.toPersistence(transaction),
        )
      : [];
    return productTable;
  }

  /**
   * Converts a Product domain model to a ProductDto.
   * @param product - The Product domain model.
   * @returns The ProductDto.
   */
  static toDto(product: Product): ProductDto {
    return new ProductDto({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      categoryId: product.category ? product.category.id : null,
    });
  }
}
