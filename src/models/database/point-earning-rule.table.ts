import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryTable } from './category.table';

@Entity('point_earning_rules')
export class PointEarningRuleTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pointsPerDollar: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @ManyToOne(() => CategoryTable, (category) => category.pointEarningRules)
  category: CategoryTable;
}
