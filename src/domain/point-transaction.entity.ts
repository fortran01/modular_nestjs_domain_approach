import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LoyaltyAccount } from './loyalty-account.entity';
import { Product } from './product.entity';

/**
 * Represents a transaction where points are earned in a loyalty program.
 */
@Entity()
export class PointTransaction {
  /**
   * The unique identifier for the point transaction.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The number of points earned in this transaction.
   */
  @Column()
  pointsEarned: number;

  /**
   * The date when the transaction occurred.
   */
  @Column()
  transactionDate: Date;

  /**
   * The loyalty account associated with this transaction.
   */
  @ManyToOne(() => LoyaltyAccount, (account) => account.transactions)
  loyaltyAccount: LoyaltyAccount;

  /**
   * The product associated with this transaction.
   */
  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;
}
