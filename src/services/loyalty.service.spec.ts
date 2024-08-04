import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyService } from './loyalty.service';
import { PointCalculationService } from '../models/domain/point-calculation.service';
import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';
import { PointsDto } from '../models/messages/points.dto';

describe('LoyaltyService', () => {
  let service: LoyaltyService;
  let mockLoyaltyAccountRepository;
  let mockProductRepository;
  let mockCategoryRepository;
  let mockPointEarningRuleRepository;
  let mockPointTransactionRepository;
  let mockPointCalculationService;

  beforeEach(async () => {
    mockLoyaltyAccountRepository = {
      findByCustomerId: jest.fn(),
      update: jest.fn(),
    };
    mockProductRepository = {
      findById: jest.fn(),
    };
    mockCategoryRepository = {
      findById: jest.fn(),
    };
    mockPointEarningRuleRepository = {
      findByCategory: jest.fn(),
    };
    mockPointTransactionRepository = {
      create: jest.fn(),
    };
    mockPointCalculationService = {
      findActiveRule: jest.fn(),
      calculatePoints: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyService,
        {
          provide: 'ILoyaltyAccountRepository',
          useValue: mockLoyaltyAccountRepository,
        },
        { provide: 'IProductRepository', useValue: mockProductRepository },
        { provide: 'ICategoryRepository', useValue: mockCategoryRepository },
        {
          provide: 'IPointEarningRuleRepository',
          useValue: mockPointEarningRuleRepository,
        },
        {
          provide: 'IPointTransactionRepository',
          useValue: mockPointTransactionRepository,
        },
        {
          provide: PointCalculationService,
          useValue: mockPointCalculationService,
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
      mockLoyaltyAccountRepository.findByCustomerId.mockResolvedValue({
        addPoints: jest.fn(),
      });
      mockProductRepository.findById.mockResolvedValue({
        isEligibleForPoints: () => true,
        category: { id: 10 },
      });
      mockCategoryRepository.findById.mockResolvedValue({});
      mockPointEarningRuleRepository.findByCategory.mockResolvedValue([]);
      mockPointCalculationService.findActiveRule.mockReturnValue({});
      mockPointCalculationService.calculatePoints.mockReturnValue(50);
      mockPointTransactionRepository.create.mockResolvedValue({});

      const result = await service.checkout(customerId, productIds);

      expect(result).toBeInstanceOf(CheckoutResponseDto);
      expect(
        mockLoyaltyAccountRepository.findByCustomerId,
      ).toHaveBeenCalledWith(customerId);
      expect(mockProductRepository.findById).toHaveBeenCalledTimes(
        productIds.length,
      );
      expect(mockPointTransactionRepository.create).toHaveBeenCalledTimes(
        productIds.length,
      );
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
