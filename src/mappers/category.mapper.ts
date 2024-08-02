import { Category } from '../models/domain/category.entity';
import { CategoryTable } from '../models/database/category.table';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../models/messages/category.dto';
import { ProductMapper } from './product.mapper';
import { PointEarningRuleMapper } from './point-earning-rule.mapper';

export class CategoryMapper {
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

  static fromCreateDto(createCategoryDto: CreateCategoryDto): Category {
    const category = new Category();
    category.name = createCategoryDto.name;
    // Assuming default empty arrays for products and rules as they are not part of DTO
    category.products = [];
    category.pointEarningRules = [];
    return category;
  }

  static fromUpdateDto(
    updateCategoryDto: UpdateCategoryDto,
    existingCategory: Category,
  ): Category {
    if (updateCategoryDto.name !== undefined) {
      existingCategory.name = updateCategoryDto.name;
    }
    return existingCategory;
  }

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
