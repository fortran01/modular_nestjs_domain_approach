import {
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerResponseDto,
} from '../models/messages/customer.dto';

/**
 * Interface for customer service operations.
 */
export interface ICustomerService {
  /**
   * Finds a customer by their unique identifier.
   * @param id The unique identifier of the customer.
   * @returns A promise that resolves to the CustomerResponseDto or undefined if not found.
   */
  findById(id: number): Promise<CustomerResponseDto | undefined>;

  /**
   * Creates a new customer with the given data.
   * @param customerDto The DTO for creating a new customer.
   * @returns A promise that resolves to the newly created CustomerResponseDto.
   */
  create(customerDto: CreateCustomerDto): Promise<CustomerResponseDto>;

  /**
   * Updates an existing customer with the given data.
   * @param id The unique identifier of the customer to update.
   * @param customerDto The DTO with new data for the customer.
   * @returns A promise that resolves to the updated CustomerResponseDto.
   */
  update(
    id: number,
    customerDto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto>;

  /**
   * Deletes a customer by their unique identifier.
   * @param id The unique identifier of the customer to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
