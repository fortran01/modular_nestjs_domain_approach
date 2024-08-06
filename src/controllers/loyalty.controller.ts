import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  Render,
  Put,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoyaltyService } from '../services/loyalty.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDto } from '../models/messages/login.dto';
import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';
import { PointsDto } from '../models/messages/points.dto';
import { AddToCartDto } from '../models/messages/add-to-cart.dto';
import { UpdateCartItemDto } from '../models/messages/update-cart-item.dto';

/**
 * Controller for handling loyalty related operations.
 */
@Controller()
export class LoyaltyController {
  constructor(
    private readonly loyaltyService: LoyaltyService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  /**
   * Render the index view with customer and product data.
   * @param req Express request object.
   * @returns Rendered view with customer and product data.
   */
  @Get()
  @Render('index')
  async root(@Req() req: Request): Promise<{
    logged_in: boolean;
    customer_id: string | undefined;
    products: any[];
  }> {
    const customerId: string | undefined = req.cookies['customer_id'];
    const loggedIn: boolean = !!customerId;
    let products: any[] = [];
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
   * @param req Express request object.
   * @returns A promise resolved with checkout result data transfer object.
   */
  @Post('checkout')
  @UseGuards(AuthGuard)
  async checkout(@Req() req: Request): Promise<CheckoutResponseDto> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    const cart = await this.shoppingCartService.getCart(customerId);
    if (!cart) {
      throw new Error('No cart found for this customer.');
    }

    const checkoutResult = await this.loyaltyService.checkout(customerId);

    if (checkoutResult.success) {
      await this.shoppingCartService.clearCart(customerId);
    }

    return checkoutResult;
  }

  /**
   * Retrieves the loyalty points for a customer.
   * @param req Express request object.
   * @returns A promise resolved with points data transfer object.
   */
  @Get('points')
  @UseGuards(AuthGuard)
  async getPoints(@Req() req: Request): Promise<PointsDto> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    return await this.loyaltyService.getCustomerPoints(customerId);
  }

  /**
   * Adds an item to the shopping cart.
   * @param addToCartDto Data transfer object for adding to cart.
   * @param req Express request object.
   * @returns A promise resolved with void.
   */
  @Post('cart')
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Req() req: Request,
  ): Promise<void> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    await this.shoppingCartService.addItem(
      customerId,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  /**
   * Retrieves the shopping cart for a customer.
   * @param req Express request object.
   * @returns The shopping cart or throws NotFoundException if not found.
   */
  @Get('cart')
  async getCart(@Req() req: Request): Promise<any> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    const cart = await this.shoppingCartService.getCart(customerId);
    if (!cart) {
      throw new NotFoundException('Shopping cart not found');
    }
    return cart;
  }

  /**
   * Updates a cart item's quantity.
   * @param productId The product ID.
   * @param updateCartItemDto Data transfer object for updating cart item.
   * @param req Express request object.
   * @returns A promise resolved with void.
   */
  @Put('cart/:productId')
  async updateCartItem(
    @Param('productId') productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req: Request,
  ): Promise<void> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    await this.shoppingCartService.updateItemQuantity(
      customerId,
      productId,
      updateCartItemDto.quantity,
    );
  }

  /**
   * Removes an item from the shopping cart.
   * @param productId The product ID.
   * @param req Express request object.
   * @returns A promise resolved with void.
   */
  @Delete('cart/:productId')
  async removeFromCart(
    @Param('productId') productId: number,
    @Req() req: Request,
  ): Promise<void> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    await this.shoppingCartService.removeItem(customerId, productId);
  }

  /**
   * Clears the shopping cart for a customer.
   * @param req Express request object.
   * @returns A promise resolved with void.
   */
  @Delete('cart')
  async clearCart(@Req() req: Request): Promise<void> {
    const customerId: number = parseInt(req.cookies['customer_id']);
    await this.shoppingCartService.clearCart(customerId);
  }
}
