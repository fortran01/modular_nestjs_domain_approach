import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { PointEarningRule } from './point-earning-rule.entity';

/**
 * Represents a category of products within the system.
 */
@Entity()
export class Category {
  /**
   * The unique identifier for the category.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the category.
   */
  @Column()
  name: string;

  /**
   * A collection of products that belong to this category.
   */
  @OneToMany(() => Product, (product) => product.categoryId)
  products: Product[];

  /**
   * A collection of point earning rules associated with this category.
   */
  @OneToMany(() => PointEarningRule, (rule) => rule.category)
  pointEarningRules: PointEarningRule[];

  /**
   * Retrieves the active point earning rule based on the provided date.
   * @param date The date to check the rule's validity against.
   * @returns The active PointEarningRule if found, otherwise undefined.
   */
  getActiveRule(date: Date): PointEarningRule | undefined {
    return this.pointEarningRules.find(
      (rule) =>
        rule.startDate <= date && (!rule.endDate || rule.endDate >= date),
    );
  }
}
