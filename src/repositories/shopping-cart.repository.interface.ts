// repositories/shopping-cart.repository.interface.ts

import { ShoppingCart } from '../models/domain/shopping-cart.entity';

/**
 * Interface for the shopping cart repository with methods to manage shopping cart data.
 */
export interface IShoppingCartRepository {
  /**
   * Finds a shopping cart by the customer ID.
   * @param customerId The unique identifier of the customer.
   * @returns A promise that resolves to the ShoppingCart or undefined if not found.
   */
  findByCustomerId(customerId: number): Promise<ShoppingCart | undefined>;

  /**
   * Saves a new shopping cart to the database.
   * @param cart The ShoppingCart object to save.
   * @returns A promise that resolves to the saved ShoppingCart.
   */
  save(cart: ShoppingCart): Promise<ShoppingCart>;

  /**
   * Updates an existing shopping cart in the database.
   * @param cart The ShoppingCart object to update.
   * @returns A promise that resolves to the updated ShoppingCart.
   */
  update(cart: ShoppingCart): Promise<ShoppingCart>;

  /**
   * Deletes a shopping cart from the database.
   * @param cartId The unique identifier of the shopping cart to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete(cartId: number): Promise<void>;

  /**
   * Adds an item to a shopping cart.
   * @param cartId The unique identifier of the shopping cart.
   * @param productId The unique identifier of the product to add.
   * @param quantity The quantity of the product to add.
   * @returns A promise that resolves when the item is added.
   */
  addItem(cartId: number, productId: number, quantity: number): Promise<void>;

  /**
   * Removes an item from a shopping cart.
   * @param cartId The unique identifier of the shopping cart.
   * @param productId The unique identifier of the product to remove.
   * @returns A promise that resolves when the item is removed.
   */
  removeItem(cartId: number, productId: number): Promise<void>;

  /**
   * Updates the quantity of an item in a shopping cart.
   * @param cartId The unique identifier of the shopping cart.
   * @param productId The unique identifier of the product.
   * @param quantity The new quantity of the product.
   * @returns A promise that resolves when the quantity is updated.
   */
  updateItemQuantity(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void>;

  /**
   * Clears all items from a shopping cart.
   * @param cartId The unique identifier of the shopping cart to clear.
   * @returns A promise that resolves when the cart is cleared.
   */
  clearCart(cartId: number): Promise<void>;

  /**
   * Retrieves a shopping cart along with its items.
   * @param cartId The unique identifier of the shopping cart.
   * @returns A promise that resolves to the ShoppingCart or undefined if not found.
   */
  getCartWithItems(cartId: number): Promise<ShoppingCart | undefined>;
}
