import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTable } from './product.table';
import { PointEarningRuleTable } from './point-earning-rule.table';

/**
 * Represents the database schema for the Category entity.
 */
@Entity('categories')
export class CategoryTable {
  /**
   * The unique identifier for the category.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the category.
   * @type {string}
   */
  @Column()
  name: string;

  /**
   * A collection of products associated with this category.
   * @type {ProductTable[]}
   */
  @OneToMany(() => ProductTable, (product) => product.category)
  products: ProductTable[];

  /**
   * A collection of point earning rules associated with this category.
   * @type {PointEarningRuleTable[]}
   */
  @OneToMany(() => PointEarningRuleTable, (rule) => rule.category)
  pointEarningRules: PointEarningRuleTable[];
}
