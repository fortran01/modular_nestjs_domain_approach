import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../domain/customer.entity';
import { ICustomerRepository } from './customer.repository.interface';

/**
 * TypeORM specific implementation of the ICustomerRepository interface.
 */
@Injectable()
export class TypeOrmCustomerRepository implements ICustomerRepository {
  /**
   * Repository for handling Customer entities.
   * @param customerRepository Injected Customer repository.
   */
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /**
   * Finds a customer by their ID.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  async findById(id: number): Promise<Customer | undefined> {
    return this.customerRepository.findOne({ where: { id } });
  }

  /**
   * Finds a customer by their email address.
   * @param email The email address of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customerRepository.findOne({ where: { email } });
  }

  /**
   * Creates a new customer in the repository.
   * @param customer The Customer object to create.
   * @returns A promise that resolves to the newly created Customer.
   */
  async create(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  /**
   * Updates an existing customer in the repository.
   * @param customer The Customer object to update.
   * @returns A promise that resolves to the updated Customer.
   */
  async update(customer: Customer): Promise<Customer> {
    await this.customerRepository.update(customer.id, customer);
    return customer;
  }

  /**
   * Deletes a customer from the repository by their ID.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
