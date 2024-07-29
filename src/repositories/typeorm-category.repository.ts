import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../domain/category.entity';
import { ICategoryRepository } from './category.repository.interface';

/**
 * TypeOrm implementation of the ICategoryRepository interface.
 */
@Injectable()
export class TypeOrmCategoryRepository implements ICategoryRepository {
  /**
   * Repository for handling Category entities.
   */
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Finds a category by its ID.
   * @param id The unique identifier of the category.
   * @returns A promise that resolves to the Category or undefined if not found.
   */
  async findById(id: number): Promise<Category | undefined> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  /**
   * Retrieves all categories.
   * @returns A promise that resolves to an array of Category entities.
   */
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * Finds categories with an active point earning rule on a given date.
   * @param date The date to check for active rules.
   * @returns A promise that resolves to an array of Category entities.
   */
  async findWithActiveRule(date: Date): Promise<Category[]> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect(
        'category.pointEarningRules',
        'rule',
        'rule.startDate <= :date AND (rule.endDate IS NULL OR rule.endDate >= :date)',
        { date },
      )
      .getMany();
  }

  /**
   * Creates a new category in the repository.
   * @param category The Category object to create.
   * @returns A promise that resolves to the newly created Category.
   */
  async create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  /**
   * Updates an existing category in the repository.
   * @param category The Category object to update.
   * @returns A promise that resolves to the updated Category.
   */
  async update(category: Category): Promise<Category> {
    await this.categoryRepository.update(category.id, category);
    return category;
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
