import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LoyaltyAccountTable } from './loyalty-account.table';
import { ProductTable } from './product.table';

/**
 * Represents the database schema for a PointTransaction entity.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('point_transactions')
export class PointTransactionTable {
  /**
   * The unique identifier for the point transaction.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The number of points earned in this transaction.
   * @type {number}
   */
  @Column()
  pointsEarned: number;

  /**
   * The date when the transaction occurred.
   * @type {Date}
   */
  @Column()
  transactionDate: Date;

  /**
   * The loyalty account associated with this transaction.
   * @type {LoyaltyAccountTable}
   */
  @ManyToOne(() => LoyaltyAccountTable, (account) => account.transactions)
  loyaltyAccount: LoyaltyAccountTable;

  /**
   * The product involved in this transaction.
   * @type {ProductTable}
   */
  @ManyToOne(() => ProductTable, (product) => product.transactions)
  product: ProductTable;
}
