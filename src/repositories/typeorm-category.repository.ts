import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../models/domain/category.entity';
import { CategoryTable } from '../models/database/category.table';
import { ICategoryRepository } from './category.repository.interface';
import { CategoryMapper } from '../mappers/category.mapper';

/**
 * TypeOrm implementation of the ICategoryRepository interface.
 */
@Injectable()
export class TypeOrmCategoryRepository implements ICategoryRepository {
  /**
   * Repository for handling CategoryTable entities.
   */
  constructor(
    @InjectRepository(CategoryTable)
    private categoryRepository: Repository<CategoryTable>,
  ) {}

  /**
   * Finds a category by its ID.
   * @param id The unique identifier of the category.
   * @returns A promise that resolves to the Category or undefined if not found.
   */
  async findById(id: number): Promise<Category | undefined> {
    const categoryTable = await this.categoryRepository.findOne({
      where: { id },
    });
    return categoryTable ? CategoryMapper.toDomain(categoryTable) : undefined;
  }

  /**
   * Retrieves all categories.
   * @returns A promise that resolves to an array of Category entities.
   */
  async findAll(): Promise<Category[]> {
    const categoryTables = await this.categoryRepository.find();
    return categoryTables.map(CategoryMapper.toDomain);
  }

  /**
   * Finds categories with an active point earning rule on a given date.
   * @param date The date to check for active rules.
   * @returns A promise that resolves to an array of Category entities.
   */
  async findWithActiveRule(date: Date): Promise<Category[]> {
    const categoryTables = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect(
        'category.pointEarningRules',
        'rule',
        'rule.startDate <= :date AND (rule.endDate IS NULL OR rule.endDate >= :date)',
        { date },
      )
      .getMany();
    return categoryTables.map(CategoryMapper.toDomain);
  }

  /**
   * Creates a new category in the repository.
   * @param category The Category object to create.
   * @returns A promise that resolves to the newly created Category.
   */
  async create(category: Category): Promise<Category> {
    const categoryTable = CategoryMapper.toPersistence(category);
    const savedCategoryTable =
      await this.categoryRepository.save(categoryTable);
    return CategoryMapper.toDomain(savedCategoryTable);
  }

  /**
   * Updates an existing category in the repository.
   * @param category The Category object to update.
   * @returns A promise that resolves to the updated Category.
   */
  async update(category: Category): Promise<Category> {
    const categoryTable = CategoryMapper.toPersistence(category);
    await this.categoryRepository.update(categoryTable.id, categoryTable);
    return CategoryMapper.toDomain(categoryTable);
  }

  /**
   * Deletes a category from the repository by its ID.
   * @param id The unique identifier of the category to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
