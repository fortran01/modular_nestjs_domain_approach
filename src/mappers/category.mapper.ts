import { Category } from '../models/domain/category.entity';
import { CategoryTable } from '../models/database/category.table';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../models/messages/category.dto';
import { ProductMapper } from './product.mapper';
import { PointEarningRuleMapper } from './point-earning-rule.mapper';

/**
 * Mapper class for Category entities and DTOs.
 */
export class CategoryMapper {
  /**
   * Converts a CategoryTable object from the database to a Category domain model.
   * @param categoryTable The CategoryTable object to convert.
   * @returns The converted Category domain model.
   */
  static toDomain(categoryTable: CategoryTable): Category {
    const category = new Category();
    category.id = categoryTable.id;
    category.name = categoryTable.name;
    category.products = categoryTable.products
      ? categoryTable.products.map((productTable) =>
          ProductMapper.toDomain(productTable),
        )
      : [];
    category.pointEarningRules = categoryTable.pointEarningRules
      ? categoryTable.pointEarningRules.map((ruleTable) =>
          PointEarningRuleMapper.toDomain(ruleTable),
        )
      : [];
    return category;
  }

  /**
   * Creates a Category domain model from a CreateCategoryDto.
   * @param createCategoryDto The DTO containing the new category data.
   * @returns The newly created Category domain model.
   */
  static fromCreateDto(createCategoryDto: CreateCategoryDto): Category {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.products = [];
    category.pointEarningRules = [];
    return category;
  }

  /**
   * Updates an existing Category domain model with data from an UpdateCategoryDto.
   * @param updateCategoryDto The DTO containing updated category data.
   * @param existingCategory The existing Category domain model to update.
   * @returns The updated Category domain model.
   */
  static fromUpdateDto(
    updateCategoryDto: UpdateCategoryDto,
    existingCategory: Category,
  ): Category {
    if (updateCategoryDto.name !== undefined) {
      existingCategory.name = updateCategoryDto.name;
    }
    return existingCategory;
  }

  /**
   * Converts a Category domain model to a CategoryTable for persistence.
   * @param category The Category domain model to convert.
   * @returns The CategoryTable object for database operations.
   */
  static toPersistence(category: Category): CategoryTable {
    const categoryTable = new CategoryTable();
    categoryTable.id = category.id;
    categoryTable.name = category.name;
    categoryTable.products = category.products
      ? category.products.map((product) => ProductMapper.toPersistence(product))
      : [];
    categoryTable.pointEarningRules = category.pointEarningRules.map((rule) =>
      PointEarningRuleMapper.toPersistence(rule),
    );
    return categoryTable;
  }
}
