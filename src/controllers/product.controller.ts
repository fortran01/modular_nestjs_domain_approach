import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {
  ProductResponseDto,
  CreateProductDto,
  UpdateProductDto,
} from '../models/messages/product.dto';

/**
 * Controller for managing product-related operations.
 */
@Controller('products')
export class ProductController {
  /**
   * Constructor to inject the ProductService dependency.
   * @param productService The service handling product data operations.
   */
  constructor(private readonly productService: ProductService) {}

  /**
   * Retrieves all products.
   * @returns An array of ProductResponseDto.
   */
  @Get()
  async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productService.findAll();
    return products;
  }

  /**
   * Retrieves a single product by ID.
   * @param id The unique identifier of the product.
   * @returns The ProductResponseDto or undefined if not found.
   */
  @Get(':id')
  async getProductById(
    @Param('id') id: number,
  ): Promise<ProductResponseDto | undefined> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Creates a new product.
   * @param productDto The data transfer object for creating a product.
   * @returns The newly created ProductResponseDto.
   */
  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const newProduct = await this.productService.create(productDto);
    return newProduct;
  }

  /**
   * Updates an existing product.
   * @param id The unique identifier of the product to update.
   * @param productDto The data transfer object containing updated product data.
   * @returns The updated ProductResponseDto.
   */
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const updatedProduct = await this.productService.update(id, productDto);
    return updatedProduct;
  }

  /**
   * Deletes a product by its ID.
   * @param id The unique identifier of the product to delete.
   * @returns A promise that resolves to void.
   */
  @HttpCode(204)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id);
  }
}
