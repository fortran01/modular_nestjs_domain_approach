import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../models/domain/customer.entity';
import { CustomerTable } from '../models/database/customer.table';
import { ICustomerRepository } from './customer.repository.interface';
import { CustomerMapper } from '../mappers/customer.mapper';

/**
 * TypeORM specific implementation of the ICustomerRepository interface.
 */
@Injectable()
export class TypeOrmCustomerRepository implements ICustomerRepository {
  /**
   * Repository for handling CustomerTable entities.
   * @param customerRepository Injected CustomerTable repository.
   */
  constructor(
    @InjectRepository(CustomerTable)
    private customerRepository: Repository<CustomerTable>,
  ) {}

  /**
   * Finds a customer by their ID.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  async findById(id: number): Promise<Customer | undefined> {
    const customerTable = await this.customerRepository.findOne({
      where: { id },
    });
    return customerTable ? CustomerMapper.toDomain(customerTable) : undefined;
  }

  /**
   * Finds a customer by their email address.
   * @param email The email address of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  async findByEmail(email: string): Promise<Customer | undefined> {
    const customerTable = await this.customerRepository.findOne({
      where: { email },
    });
    return customerTable ? CustomerMapper.toDomain(customerTable) : undefined;
  }

  /**
   * Creates a new customer in the repository.
   * @param customer The Customer object to create.
   * @returns A promise that resolves to the newly created Customer.
   */
  async create(customer: Customer): Promise<Customer> {
    const customerTable = CustomerMapper.toPersistence(customer);
    const savedCustomerTable =
      await this.customerRepository.save(customerTable);
    return CustomerMapper.toDomain(savedCustomerTable);
  }

  /**
   * Updates an existing customer in the repository.
   * @param customer The Customer object to update.
   * @returns A promise that resolves to the updated Customer.
   */
  async update(customer: Customer): Promise<Customer> {
    const customerTable = CustomerMapper.toPersistence(customer);
    await this.customerRepository.update(customerTable.id, customerTable);
    return CustomerMapper.toDomain(customerTable);
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
