import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PointEarningRule } from '../domain/point-earning-rule.entity';
import { IPointEarningRuleRepository } from './point-earning-rule.repository.interface';

/**
 * Injectable class to handle operations for PointEarningRule entities using TypeORM.
 */
@Injectable()
export class TypeOrmPointEarningRuleRepository
  implements IPointEarningRuleRepository
{
  /**
   * Repository for handling PointEarningRule entities.
   * @param pointEarningRuleRepository Injected repository for PointEarningRule.
   */
  constructor(
    @InjectRepository(PointEarningRule)
    private pointEarningRuleRepository: Repository<PointEarningRule>,
  ) {}

  /**
   * Finds a point earning rule by its ID.
   * @param id The unique identifier of the point earning rule.
   * @returns A promise that resolves to the PointEarningRule or undefined if not found.
   */
  async findById(id: number): Promise<PointEarningRule | undefined> {
    return this.pointEarningRuleRepository.findOne({ where: { id } });
  }

  /**
   * Finds an active point earning rule for a specific category on a given date.
   * @param categoryId The unique identifier of the category.
   * @param date The date to check for an active rule.
   * @returns A promise that resolves to the PointEarningRule or undefined if no active rule is found.
   */
  async findActiveRuleForCategory(
    categoryId: number,
    date: Date,
  ): Promise<PointEarningRule | undefined> {
    return this.pointEarningRuleRepository.findOne({
      where: {
        category: { id: categoryId },
        startDate: LessThanOrEqual(date),
        endDate: MoreThanOrEqual(date),
      },
      relations: ['category'],
    });
  }

  /**
   * Creates a new point earning rule in the repository.
   * @param rule The PointEarningRule object to create.
   * @returns A promise that resolves to the newly created PointEarningRule.
   */
  async create(rule: PointEarningRule): Promise<PointEarningRule> {
    return this.pointEarningRuleRepository.save(rule);
  }

  /**
   * Updates an existing point earning rule in the repository.
   * @param rule The PointEarningRule object to update.
   * @returns A promise that resolves to the updated PointEarningRule.
   */
  async update(rule: PointEarningRule): Promise<PointEarningRule> {
    await this.pointEarningRuleRepository.update(rule.id, rule);
    return rule;
  }

  /**
   * Deletes a point earning rule from the repository by its ID.
   * @param id The unique identifier of the point earning rule to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.pointEarningRuleRepository.delete(id);
  }
}
