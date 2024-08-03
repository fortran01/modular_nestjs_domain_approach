import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoryTable } from './category.table';
import { PointTransactionTable } from './point-transaction.table';

/**
 * Represents the database schema for a Product entity.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('products')
export class ProductTable {
  /**
   * The unique identifier for the product.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the product.
   * @type {string}
   */
  @Column()
  name: string;

  /**
   * The price of the product with precision up to 10 digits and 2 decimal places.
   * @type {number}
   */
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  /**
   * The URL of the product image.
   * @type {string}
   */
  @Column()
  image_url: string;

  /**
   * The category associated with this product.
   * @type {CategoryTable}
   */
  @ManyToOne(() => CategoryTable, (category) => category.products)
  category: CategoryTable;

  /**
   * The collection of point transactions associated with this product.
   * @type {PointTransactionTable[]}
   */
  @OneToMany(() => PointTransactionTable, (transaction) => transaction.product)
  transactions: PointTransactionTable[];
}
