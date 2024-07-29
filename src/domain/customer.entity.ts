import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { LoyaltyAccount } from './loyalty-account.entity';

/**
 * Represents a customer in the system.
 */
@Entity()
export class Customer {
  /**
   * The unique identifier for the customer.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the customer.
   */
  @Column()
  name: string;

  /**
   * The email address of the customer.
   */
  @Column()
  email: string;

  /**
   * The loyalty account associated with the customer.
   */
  @OneToOne(
    () => LoyaltyAccount,
    (loyaltyAccount: LoyaltyAccount) => loyaltyAccount.customer,
  )
  loyaltyAccount: LoyaltyAccount;
}
