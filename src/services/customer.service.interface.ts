import { CustomerDto } from '../models/messages/customer.dto';

/**
 * Interface for customer service operations.
 */
export interface ICustomerService {
  /**
   * Finds a customer by their unique identifier.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the CustomerDto or undefined if not found.
   */
  findById(id: number): Promise<CustomerDto | undefined>;

  /**
   * Creates a new customer with the given data.
   * @param customerDto The DTO for creating a new customer.
   * @returns A promise that resolves to the newly created CustomerDto.
   */
  create(customerDto: CustomerDto): Promise<CustomerDto>;

  /**
   * Updates an existing customer with the given data.
   * @param id The unique identifier of the customer to update.
   * @param customerDto The DTO with new data for the customer.
   * @returns A promise that resolves to the updated CustomerDto.
   */
  update(id: number, customerDto: CustomerDto): Promise<CustomerDto>;

  /**
   * Deletes a customer by their unique identifier.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
