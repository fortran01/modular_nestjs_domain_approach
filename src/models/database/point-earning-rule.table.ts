import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryTable } from './category.table';

/**
 * Represents the database schema for a PointEarningRule entity.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('point_earning_rules')
export class PointEarningRuleTable {
  /**
   * The unique identifier for the point earning rule.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The number of points earned per dollar spent.
   * @type {number}
   */
  @Column()
  pointsPerDollar: number;

  /**
   * The start date from which the rule is applicable.
   * @type {Date}
   */
  @Column()
  startDate: Date;

  /**
   * The optional end date after which the rule is no longer applicable.
   * @type {Date | null}
   */
  @Column({ nullable: true })
  endDate: Date;

  /**
   * The category associated with this point earning rule.
   * @type {CategoryTable}
   */
  @ManyToOne(() => CategoryTable, (category) => category.pointEarningRules)
  category: CategoryTable;
}
