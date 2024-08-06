// models/domain/shopping-cart.entity.ts

import { Customer } from './customer.entity';
import { Product } from './product.entity';

/**
 * Represents an item within a shopping cart.
 */
export class ShoppingCartItem {
  /** Unique identifier for the shopping cart item. */
  id: number;

  /** The product associated with this cart item. */
  product: Product;

  /** Quantity of the product in the cart. */
  quantity: number;

  /**
   * Constructs a new ShoppingCartItem instance.
   * @param product The product to add to the cart.
   * @param quantity The quantity of the product.
   */
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  /**
   * Calculates the total price for this cart item.
   * @returns The total price.
   */
  getTotalPrice(): number {
    return this.product.price * this.quantity;
  }
}

/**
 * Represents a shopping cart.
 */
export class ShoppingCart {
  /** Unique identifier for the shopping cart. */
  id: number;

  /** The customer who owns this shopping cart. */
  customer: Customer;

  /** Collection of items in the shopping cart. */
  items: ShoppingCartItem[] = [];

  /** Timestamp when the cart was created. */
  createdAt: Date;

  /** Timestamp when the cart was last updated. */
  updatedAt: Date;

  /**
   * Adds a product to the shopping cart or increases the quantity if it already exists.
   * @param product The product to add.
   * @param quantity The quantity of the product to add.
   */
  addItem(product: Product, quantity: number): void {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updatedAt = new Date();
  }

  /**
   * Removes an item from the shopping cart by product ID.
   * @param productId The ID of the product to remove.
   */
  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.updatedAt = new Date();
  }

  /**
   * Updates the quantity of a specific item in the shopping cart.
   * @param productId The ID of the product to update.
   * @param quantity The new quantity of the product.
   */
  updateItemQuantity(productId: number, quantity: number): void {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updatedAt = new Date();
    }
  }

  /**
   * Calculates the total price of all items in the cart.
   * @returns The total price of all items.
   */
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  /**
   * Calculates the total count of all items in the cart.
   * @returns The total item count.
   */
  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Clears all items from the shopping cart.
   */
  clear(): void {
    this.items = [];
    this.updatedAt = new Date();
  }
}
