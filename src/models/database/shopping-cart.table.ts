// models/database/shopping-cart.table.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CustomerTable } from './customer.table';
import { ProductTable } from './product.table';

/**
 * Represents the database schema for a shopping cart.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('shopping_carts')
export class ShoppingCartTable {
  /**
   * The unique identifier for the shopping cart.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The customer associated with this shopping cart.
   * @type {CustomerTable}
   */
  @ManyToOne(() => CustomerTable, (customer) => customer.shoppingCarts)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerTable;

  /**
   * The collection of items in the shopping cart.
   * @type {ShoppingCartItemTable[]}
   */
  @OneToMany(() => ShoppingCartItemTable, (item) => item.cart, {
    cascade: true,
  })
  items: ShoppingCartItemTable[];

  /**
   * The timestamp when the cart was created.
   * @type {Date}
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /**
   * The timestamp when the cart was last updated.
   * @type {Date}
   */
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

/**
 * Represents the database schema for an item within a shopping cart.
 * @Entity Decorator that marks a class as an entity for TypeORM.
 */
@Entity('shopping_cart_items')
export class ShoppingCartItemTable {
  /**
   * The unique identifier for the shopping cart item.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The shopping cart associated with this item.
   * @type {ShoppingCartTable}
   */
  @ManyToOne(() => ShoppingCartTable, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: ShoppingCartTable;

  /**
   * The product associated with this cart item.
   * @type {ProductTable}
   */
  @ManyToOne(() => ProductTable)
  @JoinColumn({ name: 'product_id' })
  product: ProductTable;

  /**
   * The quantity of the product in the cart.
   * @type {number}
   */
  @Column()
  quantity: number;
}
