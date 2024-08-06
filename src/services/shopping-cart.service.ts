// services/shopping-cart.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { IShoppingCartService } from './shopping-cart.service.interface';
import { IShoppingCartRepository } from '../repositories/shopping-cart.repository.interface';
import { ShoppingCart } from '../models/domain/shopping-cart.entity';

@Injectable()
export class ShoppingCartService implements IShoppingCartService {
  constructor(
    @Inject('IShoppingCartRepository')
    private shoppingCartRepository: IShoppingCartRepository,
  ) {}

  async getOrCreateCart(customerId: number): Promise<ShoppingCart> {
    let cart = await this.shoppingCartRepository.findByCustomerId(customerId);
    if (!cart) {
      cart = new ShoppingCart();
      cart.customer = { id: customerId } as any; // We'll need to fetch the full customer data in a real scenario
      cart = await this.shoppingCartRepository.save(cart);
    }
    return cart;
  }

  async addItem(
    customerId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    const cart = await this.getOrCreateCart(customerId);
    await this.shoppingCartRepository.addItem(cart.id, productId, quantity);
  }

  async removeItem(customerId: number, productId: number): Promise<void> {
    const cart = await this.getOrCreateCart(customerId);
    await this.shoppingCartRepository.removeItem(cart.id, productId);
  }

  async updateItemQuantity(
    customerId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    const cart = await this.getOrCreateCart(customerId);
    await this.shoppingCartRepository.updateItemQuantity(
      cart.id,
      productId,
      quantity,
    );
  }

  async getCart(customerId: number): Promise<ShoppingCart | undefined> {
    return this.shoppingCartRepository.findByCustomerId(customerId);
  }

  async clearCart(customerId: number): Promise<void> {
    const cart = await this.getOrCreateCart(customerId);
    await this.shoppingCartRepository.clearCart(cart.id);
  }
}
