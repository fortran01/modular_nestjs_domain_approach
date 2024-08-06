// services/shopping-cart.service.interface.ts

import { ShoppingCart } from '../models/domain/shopping-cart.entity';

export interface IShoppingCartService {
  getOrCreateCart(customerId: number): Promise<ShoppingCart>;
  addItem(
    customerId: number,
    productId: number,
    quantity: number,
  ): Promise<void>;
  removeItem(customerId: number, productId: number): Promise<void>;
  updateItemQuantity(
    customerId: number,
    productId: number,
    quantity: number,
  ): Promise<void>;
  getCart(customerId: number): Promise<ShoppingCart | undefined>;
  clearCart(customerId: number): Promise<void>;
}
