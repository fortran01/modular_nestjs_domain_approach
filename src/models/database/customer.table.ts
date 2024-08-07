import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { LoyaltyAccountTable } from './loyalty-account.table';
import { ShoppingCartTable } from './shopping-cart.table';

/**
 * Represents the database schema for the Customer entity.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('customers')
export class CustomerTable {
  /**
   * The unique identifier for the customer.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the customer.
   * @type {string}
   */
  @Column()
  name: string;

  /**
   * The email address of the customer.
   * @type {string}
   */
  @Column()
  email: string;

  /**
   * The loyalty account associated with the customer.
   * @type {LoyaltyAccountTable}
   */
  @OneToOne(
    () => LoyaltyAccountTable,
    (loyaltyAccount: LoyaltyAccountTable) => loyaltyAccount.customer,
  )
  @JoinColumn()
  loyaltyAccount: LoyaltyAccountTable;

  /**
   * The shopping carts associated with the customer.
   * @type {ShoppingCartTable[]}
   */
  @OneToMany(() => ShoppingCartTable, (cart) => cart.customer)
  shoppingCarts: ShoppingCartTable[];
}
