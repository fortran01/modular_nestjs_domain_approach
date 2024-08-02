import { PointEarningRule } from '../models/domain/point-earning-rule.entity';
import { PointEarningRuleTable } from '../models/database/point-earning-rule.table';
import { CategoryMapper } from './category.mapper';

export class PointEarningRuleMapper {
  static toDomain(
    pointEarningRuleTable: PointEarningRuleTable,
  ): PointEarningRule {
    const pointEarningRule = new PointEarningRule();
    pointEarningRule.id = pointEarningRuleTable.id;
    pointEarningRule.pointsPerDollar = pointEarningRuleTable.pointsPerDollar;
    pointEarningRule.startDate = pointEarningRuleTable.startDate;
    pointEarningRule.endDate = pointEarningRuleTable.endDate;
    pointEarningRule.category = pointEarningRuleTable.category
      ? CategoryMapper.toDomain(pointEarningRuleTable.category)
      : null;
    return pointEarningRule;
  }

  static toPersistence(
    pointEarningRule: PointEarningRule,
  ): PointEarningRuleTable {
    const pointEarningRuleTable = new PointEarningRuleTable();
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
