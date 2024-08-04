import { Injectable, Inject } from '@nestjs/common';
import { ICustomerService } from './customer.service.interface';
import { ICustomerRepository } from '../repositories/customer.repository.interface';
import { ILoyaltyAccountRepository } from '../repositories/loyalty-account.repository.interface';
import { Customer } from '../models/domain/customer.entity';
import { LoyaltyAccount } from '../models/domain/loyalty-account.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerResponseDto,
} from '../models/messages/customer.dto';
import { CustomerMapper } from '../mappers/customer.mapper';

/**
 * Service class for handling customer-related operations.
 */
@Injectable()
export class CustomerService implements ICustomerService {
  /**
   * Constructs a new instance of CustomerService.
   * @param customerRepository The repository handling customer data.
   * @param loyaltyAccountRepository The repository handling loyalty account data.
   */
  constructor(
    @Inject('ICustomerRepository')
    private customerRepository: ICustomerRepository,
    @Inject('ILoyaltyAccountRepository')
    private loyaltyAccountRepository: ILoyaltyAccountRepository,
  ) {}

  /**
   * Finds a customer by their unique identifier.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the CustomerResponseDto or undefined if not found.
   */
  async findById(id: number): Promise<CustomerResponseDto | undefined> {
    const customer = await this.customerRepository.findById(id);
    return customer ? CustomerMapper.toDto(customer) : undefined;
  }

  /**
   * Creates a new customer and initializes a loyalty account for them.
   * @param customerDto The DTO for creating a new customer.
   * @returns A promise that resolves to the newly created CustomerResponseDto.
   */
  async create(customerDto: CreateCustomerDto): Promise<CustomerResponseDto> {
    const customer = new Customer();
    customer.name = customerDto.name;
    customer.email = customerDto.email;

    const createdCustomer = await this.customerRepository.create(customer);

    const loyaltyAccount = new LoyaltyAccount();
    loyaltyAccount.customer = createdCustomer;
    await this.loyaltyAccountRepository.create(loyaltyAccount);

    return CustomerMapper.toDto(createdCustomer);
  }

  /**
   * Updates an existing customer with new data.
   * @param id The unique identifier of the customer to update.
   * @param customerDto The DTO with new data for the customer.
   * @returns A promise that resolves to the updated CustomerResponseDto.
   * @throws Error if the customer is not found.
   */
  async update(
    id: number,
    customerDto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    Object.assign(customer, customerDto);
    const updatedCustomer = await this.customerRepository.update(customer);
    return CustomerMapper.toDto(updatedCustomer);
  }

  /**
   * Deletes a customer by their unique identifier.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  /**
   * Finds all customers.
   * @returns A promise that resolves to an array of CustomerResponseDto.
   */
  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.customerRepository.findAll();
    return customers.map((customer) => CustomerMapper.toDto(customer));
  }
}
