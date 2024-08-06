// repositories/typeorm-shopping-cart.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IShoppingCartRepository } from './shopping-cart.repository.interface';
import {
  ShoppingCartTable,
  ShoppingCartItemTable,
} from '../models/database/shopping-cart.table';
import { ShoppingCart } from '../models/domain/shopping-cart.entity';
import { ShoppingCartMapper } from '../mappers/shopping-cart.mapper';
import { ProductTable } from '../models/database/product.table';

/**
 * Service class implementing the shopping cart repository interface with TypeORM.
 */
@Injectable()
export class TypeOrmShoppingCartRepository implements IShoppingCartRepository {
  constructor(
    @InjectRepository(ShoppingCartTable)
    private shoppingCartRepository: Repository<ShoppingCartTable>,
    @InjectRepository(ShoppingCartItemTable)
    private shoppingCartItemRepository: Repository<ShoppingCartItemTable>,
  ) {}

  /**
   * Finds a shopping cart by customer ID.
   * @param customerId The ID of the customer.
   * @returns A promise that resolves to the ShoppingCart or undefined.
   */
  async findByCustomerId(
    customerId: number,
  ): Promise<ShoppingCart | undefined> {
    const cartTable: ShoppingCartTable | undefined =
      await this.shoppingCartRepository.findOne({
        where: { customer: { id: customerId } },
        relations: ['items', 'items.product'],
      });
    return cartTable ? ShoppingCartMapper.toDomain(cartTable) : undefined;
  }

  /**
   * Saves a shopping cart to the database.
   * @param cart The ShoppingCart object to save.
   * @returns A promise that resolves to the saved ShoppingCart.
   */
  async save(cart: ShoppingCart): Promise<ShoppingCart> {
    const cartTable: ShoppingCartTable = ShoppingCartMapper.toPersistence(cart);
    const savedCart: ShoppingCartTable =
      await this.shoppingCartRepository.save(cartTable);
    return ShoppingCartMapper.toDomain(savedCart);
  }

  /**
   * Updates an existing shopping cart in the database.
   * @param cart The ShoppingCart object to update.
   * @returns A promise that resolves to the updated ShoppingCart.
   */
  async update(cart: ShoppingCart): Promise<ShoppingCart> {
    const cartTable: ShoppingCartTable = ShoppingCartMapper.toPersistence(cart);
    await this.shoppingCartRepository.save(cartTable);
    return cart;
  }

  /**
   * Deletes a shopping cart from the database by its ID.
   * @param cartId The ID of the cart to delete.
   */
  async delete(cartId: number): Promise<void> {
    await this.shoppingCartRepository.delete(cartId);
  }

  /**
   * Adds an item to a shopping cart.
   * @param cartId The ID of the cart.
   * @param productId The ID of the product to add.
   * @param quantity The quantity of the product to add.
   */
  async addItem(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    const existingItem: ShoppingCartItemTable | undefined =
      await this.shoppingCartItemRepository.findOne({
        where: { cart: { id: cartId }, product: { id: productId } },
      });

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.shoppingCartItemRepository.save(existingItem);
    } else {
      const newItem: ShoppingCartItemTable = new ShoppingCartItemTable();
      newItem.cart = { id: cartId } as ShoppingCartTable;
      newItem.product = { id: productId } as ProductTable;
      newItem.quantity = quantity;
      await this.shoppingCartItemRepository.save(newItem);
    }

    await this.updateCartTimestamp(cartId);
  }

  /**
   * Removes an item from a shopping cart.
   * @param cartId The ID of the cart.
   * @param productId The ID of the product to remove.
   */
  async removeItem(cartId: number, productId: number): Promise<void> {
    await this.shoppingCartItemRepository.delete({
      cart: { id: cartId },
      product: { id: productId },
    });
    await this.updateCartTimestamp(cartId);
  }

  /**
   * Updates the quantity of an item in a shopping cart.
   * @param cartId The ID of the cart.
   * @param productId The ID of the product.
   * @param quantity The new quantity of the product.
   */
  async updateItemQuantity(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    await this.shoppingCartItemRepository.update(
      { cart: { id: cartId }, product: { id: productId } },
      { quantity },
    );
    await this.updateCartTimestamp(cartId);
  }

  /**
   * Clears all items from a shopping cart.
   * @param cartId The ID of the cart to clear.
   */
  async clearCart(cartId: number): Promise<void> {
    await this.shoppingCartItemRepository.delete({ cart: { id: cartId } });
    await this.updateCartTimestamp(cartId);
  }

  /**
   * Retrieves a shopping cart along with its items.
   * @param cartId The ID of the cart.
   * @returns A promise that resolves to the ShoppingCart or undefined.
   */
  async getCartWithItems(cartId: number): Promise<ShoppingCart | undefined> {
    const cartTable: ShoppingCartTable | undefined =
      await this.shoppingCartRepository.findOne({
        where: { id: cartId },
        relations: ['items', 'items.product', 'customer'],
      });
    return cartTable ? ShoppingCartMapper.toDomain(cartTable) : undefined;
  }

  /**
   * Updates the timestamp of a shopping cart.
   * @param cartId The ID of the cart to update.
   */
  private async updateCartTimestamp(cartId: number): Promise<void> {
    await this.shoppingCartRepository.update(cartId, { updatedAt: new Date() });
  }
}
