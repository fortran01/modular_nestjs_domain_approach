import { Customer } from '../models/domain/customer.entity';
import { CustomerTable } from '../models/database/customer.table';
import { CustomerDto } from '../models/messages/customer.dto';
import { LoyaltyAccountMapper } from './loyalty-account.mapper';

export class CustomerMapper {
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

  static toDto(customer: Customer): CustomerDto {
    return new CustomerDto({
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });
  }
}
