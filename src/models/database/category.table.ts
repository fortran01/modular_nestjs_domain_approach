import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTable } from './product.table';
import { PointEarningRuleTable } from './point-earning-rule.table';

@Entity('categories')
export class CategoryTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductTable, (product) => product.category)
  products: ProductTable[];

  @OneToMany(() => PointEarningRuleTable, (rule) => rule.category)
  pointEarningRules: PointEarningRuleTable[];
}
