import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerDto } from '../models/messages/customer.dto';
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
  async getCustomer(@Param('id') id: string): Promise<CustomerDto> {
    const customer = await this.customerService.findById(parseInt(id));
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    } as CustomerDto;
  }
}
