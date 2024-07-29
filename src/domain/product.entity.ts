import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { PointTransaction } from './point-transaction.entity';

/**
 * Represents a product in the system.
 */
@Entity()
export class Product {
  /**
   * The unique identifier for the product.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the product.
   */
  @Column()
  name: string;

  /**
   * The price of the product in decimal format.
   */
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  /**
   * The URL of the product image.
   */
  @Column()
  image_url: string;

  /**
   * The category ID to which the product belongs.
   */
  @Column()
  categoryId: number;

  /**
   * The collection of point transactions associated with this product.
   */
  @OneToMany(() => PointTransaction, (transaction) => transaction.product)
  transactions: PointTransaction[];

  /**
   * Calculates the number of points earned from purchasing this product.
   * @param pointsPerDollar The number of points earned per dollar spent.
   * @returns The total points as an integer.
   */
  calculatePoints(pointsPerDollar: number): number {
    return Math.floor(this.price * pointsPerDollar);
  }
}
