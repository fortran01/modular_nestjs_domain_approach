// mappers/shopping-cart.mapper.ts

import {
  ShoppingCart,
  ShoppingCartItem,
} from '../models/domain/shopping-cart.entity';
import {
  ShoppingCartTable,
  ShoppingCartItemTable,
} from '../models/database/shopping-cart.table';
import { ProductMapper } from './product.mapper';
import { CustomerMapper } from './customer.mapper';

export class ShoppingCartMapper {
  static toDomain(shoppingCartTable: ShoppingCartTable): ShoppingCart {
    const shoppingCart = new ShoppingCart();
    shoppingCart.id = shoppingCartTable.id;
    shoppingCart.customer = CustomerMapper.toDomain(shoppingCartTable.customer);
    shoppingCart.items = shoppingCartTable.items.map((item) =>
      this.itemToDomain(item),
    );
    shoppingCart.createdAt = shoppingCartTable.createdAt;
    shoppingCart.updatedAt = shoppingCartTable.updatedAt;
    return shoppingCart;
  }

  static toPersistence(shoppingCart: ShoppingCart): ShoppingCartTable {
    const shoppingCartTable = new ShoppingCartTable();
    shoppingCartTable.id = shoppingCart.id;
    shoppingCartTable.customer = CustomerMapper.toPersistence(
      shoppingCart.customer,
    );
    shoppingCartTable.items = shoppingCart.items.map((item) =>
      this.itemToPersistence(item),
    );
    shoppingCartTable.createdAt = shoppingCart.createdAt;
    shoppingCartTable.updatedAt = shoppingCart.updatedAt;
    return shoppingCartTable;
  }

  private static itemToDomain(
    itemTable: ShoppingCartItemTable,
  ): ShoppingCartItem {
    return new ShoppingCartItem(
      ProductMapper.toDomain(itemTable.product),
      itemTable.quantity,
    );
  }

  private static itemToPersistence(
    item: ShoppingCartItem,
  ): ShoppingCartItemTable {
    const itemTable = new ShoppingCartItemTable();
    itemTable.id = item.id;
    itemTable.product = ProductMapper.toPersistence(item.product);
    itemTable.quantity = item.quantity;
    return itemTable;
  }
}
