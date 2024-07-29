import { Injectable, Inject } from '@nestjs/common';
import { ICustomerService } from './customer.service.interface';
import { ICustomerRepository } from '../repositories/customer.repository.interface';
import { ILoyaltyAccountRepository } from '../repositories/loyalty-account.repository.interface';
import { Customer } from '../domain/customer.entity';
import { LoyaltyAccount } from '../domain/loyalty-account.entity';

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
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  async findById(id: number): Promise<Customer | undefined> {
    return this.customerRepository.findById(id);
  }

  /**
   * Creates a new customer and initializes a loyalty account for them.
   * @param customerData The data for creating a new customer.
   * @returns A promise that resolves to the newly created Customer.
   */
  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, customerData);
    const createdCustomer = await this.customerRepository.create(customer);

    const loyaltyAccount = new LoyaltyAccount();
    loyaltyAccount.customer = createdCustomer;
    await this.loyaltyAccountRepository.create(loyaltyAccount);

    return createdCustomer;
  }

  /**
   * Updates an existing customer with new data.
   * @param id The unique identifier of the customer to update.
   * @param customerData The new data for the customer.
   * @returns A promise that resolves to the updated Customer.
   * @throws Error if the customer is not found.
   */
  async update(id: number, customerData: Partial<Customer>): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    Object.assign(customer, customerData);
    return this.customerRepository.update(customer);
  }

  /**
   * Deletes a customer by their unique identifier.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
