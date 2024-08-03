import { PointEarningRule } from '../models/domain/point-earning-rule.entity';
import { PointEarningRuleTable } from '../models/database/point-earning-rule.table';
import { CategoryMapper } from './category.mapper';

/**
 * Mapper class for converting between PointEarningRule domain model and database table representations.
 */
export class PointEarningRuleMapper {
  /**
   * Converts a PointEarningRuleTable database object to a PointEarningRule domain model.
   * @param pointEarningRuleTable - The database object to convert.
   * @returns The converted PointEarningRule domain model.
   */
  static toDomain(
    pointEarningRuleTable: PointEarningRuleTable,
  ): PointEarningRule {
    const pointEarningRule: PointEarningRule = new PointEarningRule();
    pointEarningRule.id = pointEarningRuleTable.id;
    pointEarningRule.pointsPerDollar = pointEarningRuleTable.pointsPerDollar;
    pointEarningRule.startDate = pointEarningRuleTable.startDate;
    pointEarningRule.endDate = pointEarningRuleTable.endDate;
    pointEarningRule.category = pointEarningRuleTable.category
      ? CategoryMapper.toDomain(pointEarningRuleTable.category)
      : null;
    return pointEarningRule;
  }

  /**
   * Converts a PointEarningRule domain model to a PointEarningRuleTable for persistence.
   * @param pointEarningRule - The domain model to convert.
   * @returns The PointEarningRuleTable database object.
   */
  static toPersistence(
    pointEarningRule: PointEarningRule,
  ): PointEarningRuleTable {
    const pointEarningRuleTable: PointEarningRuleTable =
      new PointEarningRuleTable();
    pointEarningRuleTable.id = pointEarningRule.id;
    pointEarningRuleTable.pointsPerDollar = pointEarningRule.pointsPerDollar;
    pointEarningRuleTable.startDate = pointEarningRule.startDate;
    pointEarningRuleTable.endDate = pointEarningRule.endDate;
    pointEarningRuleTable.category = pointEarningRule.category
      ? CategoryMapper.toPersistence(pointEarningRule.category)
      : null;
    return pointEarningRuleTable;
  }
}
