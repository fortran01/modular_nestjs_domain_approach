import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from '../services/loyalty.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { Request, Response } from 'express';

describe('LoyaltyController', () => {
  let controller: LoyaltyController;
  let mockLoyaltyService;
  let mockCustomerService;
  let mockProductService;

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

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyController],
      providers: [
        { provide: LoyaltyService, useValue: mockLoyaltyService },
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: ProductService, useValue: mockProductService },
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
      const mockCheckoutDto = { product_ids: [1, 2, 3] };
      const mockCheckoutResult = {
        total_points_earned: 100,
        invalid_products: [],
        products_missing_category: [],
        point_earning_rules_missing: [],
      };

      mockLoyaltyService.checkout.mockResolvedValue(mockCheckoutResult);

      const result = await controller.checkout(
        mockCheckoutDto,
        mockRequest as any as Request,
      );

      expect(result).toEqual(mockCheckoutResult);
      expect(mockLoyaltyService.checkout).toHaveBeenCalledWith(1, [1, 2, 3]);
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
});
