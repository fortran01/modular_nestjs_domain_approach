import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { PointTransaction } from './point-transaction.entity';

/**
 * Represents a loyalty account associated with a customer.
 */
@Entity()
export class LoyaltyAccount {
  /**
   * The unique identifier for the loyalty account.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The total points accumulated in the loyalty account.
   */
  @Column({ default: 0 })
  points: number;

  /**
   * The customer associated with this loyalty account.
   */
  @OneToOne(() => Customer, (customer) => customer.loyaltyAccount)
  @JoinColumn()
  customer: Customer;

  /**
   * The collection of point transactions associated with this loyalty account.
   */
  @OneToMany(
    () => PointTransaction,
    (transaction) => transaction.loyaltyAccount,
  )
  transactions: PointTransaction[];

  /**
   * Adds a specified number of points to the loyalty account.
   * @param points The number of points to add.
   */
  addPoints(points: number): void {
    this.points += points;
  }
}
