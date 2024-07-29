import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

/**
 * Represents a rule for earning points based on dollars spent within a specific category.
 */
@Entity()
export class PointEarningRule {
  /**
   * The unique identifier for the point earning rule.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The number of points earned per dollar spent.
   */
  @Column()
  pointsPerDollar: number;

  /**
   * The start date from which the rule is applicable.
   */
  @Column()
  startDate: Date;

  /**
   * The optional end date after which the rule is no longer applicable.
   */
  @Column({ nullable: true })
  endDate: Date;

  /**
   * The category associated with this point earning rule.
   */
  @ManyToOne(() => Category, (category) => category.pointEarningRules)
  category: Category;
}
