import { Customer } from '../domain/customer.entity';

/**
 * Interface for customer repository operations.
 */
export interface ICustomerRepository {
  /**
   * Finds a customer by their ID.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  findById(id: number): Promise<Customer | undefined>;

  /**
   * Finds a customer by their email address.
   * @param email The email address of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  findByEmail(email: string): Promise<Customer | undefined>;

  /**
   * Creates a new customer in the repository.
   * @param customer The customer object to create.
   * @returns A promise that resolves to the newly created Customer.
   */
  create(customer: Customer): Promise<Customer>;

  /**
   * Updates an existing customer in the repository.
   * @param customer The customer object to update.
   * @returns A promise that resolves to the updated Customer.
   */
  update(customer: Customer): Promise<Customer>;

  /**
   * Deletes a customer from the repository by their ID.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
