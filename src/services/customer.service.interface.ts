import { Customer } from '../domain/customer.entity';

/**
 * Interface for customer service operations.
 */
export interface ICustomerService {
  /**
   * Finds a customer by their unique identifier.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the Customer or undefined if not found.
   */
  findById(id: number): Promise<Customer | undefined>;

  /**
   * Creates a new customer with the given data.
   * @param customer A partial customer object containing data for the new customer.
   * @returns A promise that resolves to the newly created Customer.
   */
  create(customer: Partial<Customer>): Promise<Customer>;

  /**
   * Updates an existing customer with the given data.
   * @param id The unique identifier of the customer to update.
   * @param customerData A partial customer object containing data to update.
   * @returns A promise that resolves to the updated Customer.
   */
  update(id: number, customerData: Partial<Customer>): Promise<Customer>;

  /**
   * Deletes a customer by their unique identifier.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
