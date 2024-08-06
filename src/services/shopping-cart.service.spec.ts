// services/shopping-cart.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { IShoppingCartRepository } from '../repositories/shopping-cart.repository.interface';
import { ShoppingCart } from '../models/domain/shopping-cart.entity';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let mockShoppingCartRepository: Partial<IShoppingCartRepository>;

  beforeEach(async () => {
    mockShoppingCartRepository = {
      findByCustomerId: jest.fn().mockResolvedValue({
        id: 1, // Ensure the cart has an ID
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateItemQuantity: jest.fn(),
        clearCart: jest.fn(),
      }),
      save: jest.fn().mockResolvedValue(new ShoppingCart()),
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateItemQuantity: jest.fn(),
      clearCart: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        {
          provide: 'IShoppingCartRepository',
          useValue: mockShoppingCartRepository,
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreateCart', () => {
    it('should return existing cart if found', async () => {
      const mockCart = new ShoppingCart();
      mockShoppingCartRepository.findByCustomerId = jest
        .fn()
        .mockResolvedValue(mockCart);

      const result = await service.getOrCreateCart(1);

      expect(result).toBe(mockCart);
      expect(mockShoppingCartRepository.findByCustomerId).toHaveBeenCalledWith(
        1,
      );
      expect(mockShoppingCartRepository.save).not.toHaveBeenCalled();
    });

    it('should create new cart if not found', async () => {
      const mockCart = new ShoppingCart();
      mockShoppingCartRepository.findByCustomerId = jest
        .fn()
        .mockResolvedValue(undefined);
      mockShoppingCartRepository.save = jest.fn().mockResolvedValue(mockCart);

      const result = await service.getOrCreateCart(1);

      expect(result).toBe(mockCart);
      expect(mockShoppingCartRepository.findByCustomerId).toHaveBeenCalledWith(
        1,
      );
      expect(mockShoppingCartRepository.save).toHaveBeenCalled();
    });
  });

  describe('addItem', () => {
    it('should add an item to the cart', async () => {
      const cartId = 1;
      const productId = 2;
      const quantity = 3;

      await service.addItem(cartId, productId, quantity);

      expect(mockShoppingCartRepository.addItem).toHaveBeenCalledWith(
        cartId,
        productId,
        quantity,
      );
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', async () => {
      const cartId = 1;
      const productId = 2;

      await service.removeItem(cartId, productId);

      expect(mockShoppingCartRepository.removeItem).toHaveBeenCalledWith(
        cartId,
        productId,
      );
    });
  });

  describe('updateItemQuantity', () => {
    it('should update the quantity of an item in the cart', async () => {
      const cartId = 1;
      const productId = 2;
      const newQuantity = 5;

      await service.updateItemQuantity(cartId, productId, newQuantity);

      expect(
        mockShoppingCartRepository.updateItemQuantity,
      ).toHaveBeenCalledWith(cartId, productId, newQuantity);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from the cart', async () => {
      const cartId = 1;

      await service.clearCart(cartId);

      expect(mockShoppingCartRepository.clearCart).toHaveBeenCalledWith(cartId);
    });
  });
});
