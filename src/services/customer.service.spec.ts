import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerResponseDto,
} from '../models/messages/customer.dto';
import { Customer } from '../models/domain/customer.entity';

/**
 * Test suite for CustomerService
 */
describe('CustomerService', () => {
  let service: CustomerService;
  let mockCustomerRepository: {
    findById: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findAll: jest.Mock;
  };
  let mockLoyaltyAccountRepository: {
    create: jest.Mock;
  };

  /**
   * Setup for each test in the suite
   */
  beforeEach(async () => {
    mockCustomerRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    mockLoyaltyAccountRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: 'ICustomerRepository',
          useValue: mockCustomerRepository,
        },
        {
          provide: 'ILoyaltyAccountRepository',
          useValue: mockLoyaltyAccountRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a customer when found', async () => {
      const mockCustomer = new Customer();
      mockCustomer.id = 1;
      mockCustomer.name = 'John Doe';
      mockCustomer.email = 'john@example.com';

      mockCustomerRepository.findById.mockResolvedValue(mockCustomer);

      const result = await service.findById(1);

      expect(result).toEqual(
        new CustomerResponseDto({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        }),
      );
      expect(mockCustomerRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return undefined when customer is not found', async () => {
      mockCustomerRepository.findById.mockResolvedValue(undefined);

      const result = await service.findById(1);

      expect(result).toBeUndefined();
      expect(mockCustomerRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new customer and return the created customer data', async () => {
      const mockCustomerDto = new CreateCustomerDto({
        name: 'Jane Doe',
        email: 'jane@example.com',
      });

      const mockCustomer = new Customer();
      mockCustomer.id = 2;
      mockCustomer.name = 'Jane Doe';
      mockCustomer.email = 'jane@example.com';

      mockCustomerRepository.create.mockResolvedValue(mockCustomer);

      const result = await service.create(mockCustomerDto);

      expect(mockCustomerRepository.create).toHaveBeenCalledWith({
        name: 'Jane Doe',
        email: 'jane@example.com',
      });

      expect(result).toEqual(
        new CustomerResponseDto({
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
        }),
      );
    });
  });

  describe('update', () => {
    it('should update an existing customer and return the updated customer data', async () => {
      const mockCustomerDto = new UpdateCustomerDto({
        name: 'John Updated',
        email: 'johnupdated@example.com',
      });

      const mockCustomer = new Customer();
      mockCustomer.id = 1;
      mockCustomer.name = 'John Updated';
      mockCustomer.email = 'johnupdated@example.com';

      mockCustomerRepository.findById.mockResolvedValue(mockCustomer);
      mockCustomerRepository.update.mockResolvedValue(mockCustomer);

      const result = await service.update(1, mockCustomerDto);

      expect(result).toEqual(
        new CustomerResponseDto({
          id: 1,
          name: 'John Updated',
          email: 'johnupdated@example.com',
        }),
      );
      expect(mockCustomerRepository.update).toHaveBeenCalledWith(mockCustomer);
    });

    it('should throw an error when the customer to update is not found', async () => {
      mockCustomerRepository.findById.mockResolvedValue(undefined);

      await expect(
        service.update(1, new UpdateCustomerDto({})),
      ).rejects.toThrow('Customer not found');
    });
  });

  describe('delete', () => {
    it('should delete a customer and not return anything', async () => {
      mockCustomerRepository.delete.mockResolvedValue(undefined);

      await expect(service.delete(1)).resolves.toBeUndefined();
      expect(mockCustomerRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      const mockCustomers = [
        new CustomerResponseDto({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        }),
        new CustomerResponseDto({
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
        }),
      ];
      mockCustomerRepository.findAll.mockResolvedValue(mockCustomers);

      const result = await service.findAll();

      expect(result).toEqual(mockCustomers);
      expect(mockCustomerRepository.findAll).toHaveBeenCalled();
    });
  });
});
