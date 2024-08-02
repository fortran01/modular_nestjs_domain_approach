import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PointEarningRule } from '../models/domain/point-earning-rule.entity';
import { PointEarningRuleTable } from '../models/database/point-earning-rule.table';
import { IPointEarningRuleRepository } from './point-earning-rule.repository.interface';
import { PointEarningRuleMapper } from '../mappers/point-earning-rule.mapper';

/**
 * Injectable class to handle operations for PointEarningRule entities using TypeORM.
 */
@Injectable()
export class TypeOrmPointEarningRuleRepository
  implements IPointEarningRuleRepository
{
  /**
   * Repository for handling PointEarningRuleTable entities.
   * @param pointEarningRuleRepository Injected repository for PointEarningRuleTable.
   */
  constructor(
    @InjectRepository(PointEarningRuleTable)
    private pointEarningRuleRepository: Repository<PointEarningRuleTable>,
  ) {}

  /**
   * Finds a point earning rule by its ID.
   * @param id The unique identifier of the point earning rule.
   * @returns A promise that resolves to the PointEarningRule or undefined if not found.
   */
  async findById(id: number): Promise<PointEarningRule | undefined> {
    const ruleTable = await this.pointEarningRuleRepository.findOne({
      where: { id },
    });
    return ruleTable ? PointEarningRuleMapper.toDomain(ruleTable) : undefined;
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
    const ruleTable = await this.pointEarningRuleRepository.findOne({
      where: {
        category: { id: categoryId },
        startDate: LessThanOrEqual(date),
        endDate: MoreThanOrEqual(date),
      },
      relations: ['category'],
    });
    return ruleTable ? PointEarningRuleMapper.toDomain(ruleTable) : undefined;
  }

  /**
   * Creates a new point earning rule in the repository.
   * @param rule The PointEarningRule object to create.
   * @returns A promise that resolves to the newly created PointEarningRule.
   */
  async create(rule: PointEarningRule): Promise<PointEarningRule> {
    const ruleTable = PointEarningRuleMapper.toPersistence(rule);
    const savedRuleTable =
      await this.pointEarningRuleRepository.save(ruleTable);
    return PointEarningRuleMapper.toDomain(savedRuleTable);
  }

  /**
   * Updates an existing point earning rule in the repository.
   * @param rule The PointEarningRule object to update.
   * @returns A promise that resolves to the updated PointEarningRule.
   */
  async update(rule: PointEarningRule): Promise<PointEarningRule> {
    const ruleTable = PointEarningRuleMapper.toPersistence(rule);
    await this.pointEarningRuleRepository.update(ruleTable.id, ruleTable);
    return PointEarningRuleMapper.toDomain(ruleTable);
  }

  /**
   * Deletes a point earning rule from the repository by its ID.
   * @param id The unique identifier of the point earning rule to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.pointEarningRuleRepository.delete(id);
  }

  /**
   * Finds all point earning rules associated with a given category ID.
   * @param categoryId The unique identifier of the category.
   * @returns A promise that resolves to an array of PointEarningRule objects.
   */
  async findByCategory(categoryId: number): Promise<PointEarningRule[]> {
    const ruleTables = await this.pointEarningRuleRepository.find({
      where: { category: { id: categoryId } },
    });
    return ruleTables.map(PointEarningRuleMapper.toDomain);
  }
}
