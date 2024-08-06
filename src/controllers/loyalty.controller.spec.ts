import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from '../services/loyalty.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Request, Response } from 'express';

describe('LoyaltyController', () => {
  let controller: LoyaltyController;
  let mockLoyaltyService;
  let mockCustomerService;
  let mockProductService;
  let mockShoppingCartService;

  beforeEach(async () => {
    mockLoyaltyService = {
      checkout: jest.fn(),
      getCustomerPoints: jest.fn(),
    };

    mockCustomerService = {
      findById: jest.fn(),
    };

    mockProductService = {
      findAll: jest.fn(),
    };

    mockShoppingCartService = {
      addItem: jest.fn(),
      getCart: jest.fn().mockResolvedValue({ items: [] }),
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyController],
      providers: [
        { provide: LoyaltyService, useValue: mockLoyaltyService },
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: ProductService, useValue: mockProductService },
        { provide: ShoppingCartService, useValue: mockShoppingCartService },
      ],
    }).compile();

    controller = module.get<LoyaltyController>(LoyaltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkout', () => {
    it('should process a checkout successfully', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };
      const mockCheckoutResult = {
        total_points_earned: 100,
        invalid_products: [],
        products_missing_category: [],
        point_earning_rules_missing: [],
        success: true,
      };

      mockLoyaltyService.checkout.mockResolvedValue(mockCheckoutResult);

      const result = await controller.checkout(mockRequest as any as Request);

      expect(result).toEqual(mockCheckoutResult);
      expect(mockLoyaltyService.checkout).toHaveBeenCalledWith(1);
    });
  });

  describe('login', () => {
    it('should handle customer login', async () => {
      const mockResponse = {
        cookie: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const mockLoginDto = { customer_id: '1' };
      const mockCustomer = { id: 1 };

      mockCustomerService.findById.mockResolvedValue(mockCustomer);

      await controller.login(mockLoginDto, mockResponse as any as Response);

      expect(mockResponse.cookie).toHaveBeenCalledWith('customer_id', '1');
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });

    it('should return error on invalid customer ID during login', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockLoginDto = { customer_id: '999' };

      mockCustomerService.findById.mockResolvedValue(undefined);

      await controller.login(mockLoginDto, mockResponse as any as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid customer ID',
      });
    });
  });

  describe('logout', () => {
    it('should handle customer logout', () => {
      const mockResponse = { clearCookie: jest.fn(), json: jest.fn() };

      controller.logout(mockResponse as any as Response);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('customer_id');
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('getPoints', () => {
    it('should retrieve loyalty points for a customer', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };
      const mockPoints = { points: 150 };

      mockLoyaltyService.getCustomerPoints.mockResolvedValue(mockPoints);

      const result = await controller.getPoints(mockRequest as any as Request);

      expect(result).toEqual(mockPoints);
      expect(mockLoyaltyService.getCustomerPoints).toHaveBeenCalledWith(1);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart successfully', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };
      const mockAddToCartDto = { productId: 10, quantity: 2 };

      await controller.addToCart(
        mockAddToCartDto,
        mockRequest as any as Request,
      );

      expect(mockShoppingCartService.addItem).toHaveBeenCalledWith(1, 10, 2);
    });
  });

  describe('getCart', () => {
    it('should retrieve the shopping cart successfully', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };
      const mockCart = { items: [{ productId: 10, quantity: 2 }] };

      mockShoppingCartService.getCart.mockResolvedValue(mockCart);

      const result = await controller.getCart(mockRequest as any as Request);

      expect(result).toEqual(mockCart);
      expect(mockShoppingCartService.getCart).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCartItem', () => {
    it('should update cart item quantity successfully', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };
      const mockUpdateCartItemDto = { quantity: 3 };
      const productId = 10;

      await controller.updateCartItem(
        productId,
        mockUpdateCartItemDto,
        mockRequest as any as Request,
      );

      expect(mockShoppingCartService.updateItemQuantity).toHaveBeenCalledWith(
        1,
        10,
        3,
      );
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart successfully', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };
      const productId = 10;

      await controller.removeFromCart(productId, mockRequest as any as Request);

      expect(mockShoppingCartService.removeItem).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('clearCart', () => {
    it('should clear the shopping cart successfully', async () => {
      const mockRequest = { cookies: { customer_id: '1' } };

      await controller.clearCart(mockRequest as any as Request);

      expect(mockShoppingCartService.clearCart).toHaveBeenCalledWith(1);
    });
  });
});
