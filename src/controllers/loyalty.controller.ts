import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  Render,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoyaltyService } from '../services/loyalty.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { CheckoutDto } from '../dtos/checkout.dto';
import { CheckoutResultDto } from '../dtos/checkout-result.dto';
import { PointsDto } from '../dtos/points.dto';

/**
 * Controller for handling loyalty related operations.
 */
@Controller()
export class LoyaltyController {
  constructor(
    private readonly loyaltyService: LoyaltyService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
  ) {}

  /**
   * Render the index view with customer and product data.
   */
  @Get()
  @Render('index')
  async root(@Req() req: Request) {
    const customerId = req.cookies['customer_id'];
    const loggedIn = !!customerId;
    let products = [];
    if (loggedIn) {
      products = await this.productService.findAll();
    }
    return {
      logged_in: loggedIn,
      customer_id: customerId,
      products: products,
    };
  }

  /**
   * Handles customer login.
   * @param loginDto Data transfer object containing login information.
   * @param res Express response object.
   * @returns A promise resolved with void.
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const customer = await this.customerService.findById(
      parseInt(loginDto.customer_id),
    );
    if (customer) {
      res.cookie('customer_id', customer.id.toString());
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'Invalid customer ID' });
    }
  }

  /**
   * Handles customer logout.
   * @param res Express response object.
   */
  @Get('logout')
  logout(@Res() res: Response): void {
    res.clearCookie('customer_id');
    res.json({ success: true });
  }

  /**
   * Processes a checkout operation.
   * @param checkoutDto Data transfer object containing checkout information.
   * @param req Express request object.
   * @returns A promise resolved with checkout result data transfer object.
   */
  @Post('checkout')
  @UseGuards(AuthGuard)
  async checkout(
    @Body() checkoutDto: CheckoutDto,
    @Req() req: Request,
  ): Promise<CheckoutResultDto> {
    const customerId = parseInt(req.cookies['customer_id']);
    return this.loyaltyService.checkout(customerId, checkoutDto.product_ids);
  }

  /**
   * Retrieves the loyalty points for a customer.
   * @param req Express request object.
   * @returns A promise resolved with points data transfer object.
   */
  @Get('points')
  @UseGuards(AuthGuard)
  async getPoints(@Req() req: Request): Promise<PointsDto> {
    const customerId = parseInt(req.cookies['customer_id']);
    const points = await this.loyaltyService.getCustomerPoints(customerId);
    return { points };
  }
}
