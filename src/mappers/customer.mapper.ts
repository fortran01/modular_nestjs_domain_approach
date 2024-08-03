import { Customer } from '../models/domain/customer.entity';
import { CustomerTable } from '../models/database/customer.table';
import { CustomerDto } from '../models/messages/customer.dto';
import { LoyaltyAccountMapper } from './loyalty-account.mapper';

/**
 * Mapper class for converting between various forms of Customer data.
 */
export class CustomerMapper {
  /**
   * Converts a CustomerTable database object to a Customer domain model.
   * @param customerTable - The CustomerTable object from the database.
   * @returns The Customer domain model.
   */
  static toDomain(customerTable: CustomerTable): Customer {
    const customer = new Customer();
    customer.id = customerTable.id;
    customer.name = customerTable.name;
    customer.email = customerTable.email;
    customer.loyaltyAccount = customerTable.loyaltyAccount
      ? LoyaltyAccountMapper.toDomain(customerTable.loyaltyAccount)
      : null;
    return customer;
  }

  /**
   * Converts a Customer domain model to a CustomerTable database object.
   * @param customer - The Customer domain model.
   * @returns The CustomerTable database object.
   */
  static toPersistence(customer: Customer): CustomerTable {
    const customerTable = new CustomerTable();
    customerTable.id = customer.id;
    customerTable.name = customer.name;
    customerTable.email = customer.email;
    customerTable.loyaltyAccount = customer.loyaltyAccount
      ? LoyaltyAccountMapper.toPersistence(customer.loyaltyAccount)
      : null;
    return customerTable;
  }

  /**
   * Converts a Customer domain model to a CustomerDto.
   * @param customer - The Customer domain model.
   * @returns The CustomerDto.
   */
  static toDto(customer: Customer): CustomerDto {
    return new CustomerDto({
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });
  }
}
