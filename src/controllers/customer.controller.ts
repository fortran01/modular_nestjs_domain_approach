import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import {
  CustomerResponseDto,
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../models/messages/customer.dto';
import { AuthGuard } from '../guards/auth.guard';

/**
 * Controller to manage customer-related operations.
 */
@Controller('customers')
@UseGuards(AuthGuard)
export class CustomerController {
  /**
   * Constructor to inject dependencies.
   * @param customerService The service managing customer data.
   */
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Retrieves a customer by their ID.
   * @param id The ID of the customer as a string.
   * @returns The DTO containing customer data.
   * @throws NotFoundException if the customer is not found.
   */
  @Get(':id')
  async getCustomer(@Param('id') id: string): Promise<CustomerResponseDto> {
    const customer = await this.customerService.findById(parseInt(id));
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  /**
   * Creates a new customer.
   * @param createCustomerDto The DTO to create a new customer.
   * @returns The created customer data.
   */
  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.create(createCustomerDto);
  }

  /**
   * Updates an existing customer.
   * @param id The ID of the customer to update.
   * @param updateCustomerDto The DTO with updated data for the customer.
   * @returns The updated customer data.
   */
  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.update(parseInt(id), updateCustomerDto);
  }

  /**
   * Deletes a customer by ID.
   * @param id The ID of the customer to delete.
   * @returns A promise that resolves with no content when the customer is deleted.
   */
  @HttpCode(204)
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    await this.customerService.delete(parseInt(id));
  }

  @Get()
  async getAllCustomers(): Promise<CustomerResponseDto[]> {
    return this.customerService.findAll();
  }
}
