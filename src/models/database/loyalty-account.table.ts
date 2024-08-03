import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CustomerTable } from './customer.table';
import { PointTransactionTable } from './point-transaction.table';

/**
 * Represents the database schema for the LoyaltyAccount entity.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('loyalty_accounts')
export class LoyaltyAccountTable {
  /**
   * The unique identifier for the loyalty account.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The total loyalty points accumulated in the account.
   * @type {number}
   */
  @Column({ default: 0 })
  points: number;

  /**
   * The customer associated with this loyalty account.
   * @type {CustomerTable}
   */
  @OneToOne(
    () => CustomerTable,
    (customer: CustomerTable) => customer.loyaltyAccount,
  )
  customer: CustomerTable;

  /**
   * The collection of point transactions associated with this loyalty account.
   * @type {PointTransactionTable[]}
   */
  @OneToMany(
    () => PointTransactionTable,
    (transaction: PointTransactionTable) => transaction.loyaltyAccount,
  )
  transactions: PointTransactionTable[];

  /**
   * The timestamp of the last update made to this account.
   * @type {Date}
   */
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastUpdated: Date;
}
