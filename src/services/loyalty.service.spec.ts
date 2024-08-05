import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyService } from './loyalty.service';
import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';
import { PointsDto } from '../models/messages/points.dto';

describe('LoyaltyService', () => {
  let service: LoyaltyService;
  let mockLoyaltyAccountRepository;

  beforeEach(async () => {
    mockLoyaltyAccountRepository = {
      findByCustomerId: jest.fn(),
      checkoutTransaction: jest.fn().mockResolvedValue({
        totalPointsEarned: 100,
        invalidProducts: [],
        productsMissingCategory: [],
        pointEarningRulesMissing: [],
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyService,
        {
          provide: 'ILoyaltyAccountRepository',
          useValue: mockLoyaltyAccountRepository,
        },
      ],
    }).compile();

    service = module.get<LoyaltyService>(LoyaltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkout', () => {
    it('should process checkout correctly', async () => {
      const customerId = 1;
      const productIds = [101, 102];

      const result = await service.checkout(customerId, productIds);

      expect(result).toBeInstanceOf(CheckoutResponseDto);
      expect(result.total_points_earned).toEqual(100);
      expect(result.invalid_products).toEqual([]);
      expect(result.products_missing_category).toEqual([]);
      expect(result.point_earning_rules_missing).toEqual([]);
      expect(
        mockLoyaltyAccountRepository.checkoutTransaction,
      ).toHaveBeenCalledWith(customerId, productIds);
    });
  });

  describe('getCustomerPoints', () => {
    it('should retrieve customer points correctly', async () => {
      const customerId = 1;
      const expectedPoints = 150;
      mockLoyaltyAccountRepository.findByCustomerId.mockResolvedValue({
        getPoints: () => expectedPoints,
      });

      const result = await service.getCustomerPoints(customerId);

      expect(result).toEqual(new PointsDto({ points: expectedPoints }));
      expect(
        mockLoyaltyAccountRepository.findByCustomerId,
      ).toHaveBeenCalledWith(customerId);
    });
  });
});
