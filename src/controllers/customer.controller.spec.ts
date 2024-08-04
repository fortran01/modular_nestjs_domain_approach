import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from '../services/customer.service';
import { NotFoundException } from '@nestjs/common';

describe('CustomerController', () => {
  let controller: CustomerController;
  let mockCustomerService;

  beforeEach(async () => {
    mockCustomerService = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{ provide: CustomerService, useValue: mockCustomerService }],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCustomers', () => {
    it('should return all customers', async () => {
      const mockCustomers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];
      mockCustomerService.findAll.mockResolvedValue(mockCustomers);

      const result = await controller.getAllCustomers();
      expect(result).toEqual(mockCustomers);
      expect(mockCustomerService.findAll).toHaveBeenCalled();
    });
  });

  describe('getCustomer', () => {
    it('should return a customer by ID', async () => {
      const mockCustomer = { id: 1, name: 'John Doe' };
      mockCustomerService.findById.mockResolvedValue(mockCustomer);

      const result = await controller.getCustomer('1');
      expect(result).toEqual(mockCustomer);
      expect(mockCustomerService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if customer is not found', async () => {
      mockCustomerService.findById.mockResolvedValue(undefined);

      await expect(controller.getCustomer('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      const mockCustomerDto = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      }; // Added email property
      const mockCreatedCustomer = { id: 1, ...mockCustomerDto };
      mockCustomerService.create.mockResolvedValue(mockCreatedCustomer);

      const result = await controller.createCustomer(mockCustomerDto);
      expect(result).toEqual(mockCreatedCustomer);
      expect(mockCustomerService.create).toHaveBeenCalledWith(mockCustomerDto);
    });
  });

  describe('updateCustomer', () => {
    it('should update an existing customer', async () => {
      const mockCustomerDto = { name: 'Jane Doe Updated' };
      const mockUpdatedCustomer = { id: 1, ...mockCustomerDto };
      mockCustomerService.update.mockResolvedValue(mockUpdatedCustomer);

      const result = await controller.updateCustomer('1', mockCustomerDto);
      expect(result).toEqual(mockUpdatedCustomer);
      expect(mockCustomerService.update).toHaveBeenCalledWith(
        1,
        mockCustomerDto,
      );
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer by ID', async () => {
      mockCustomerService.delete.mockResolvedValue();

      await controller.deleteCustomer('1');
      expect(mockCustomerService.delete).toHaveBeenCalledWith(1);
    });
  });
});
