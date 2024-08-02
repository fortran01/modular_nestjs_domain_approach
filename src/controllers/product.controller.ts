import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto } from '../models/messages/product.dto';

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
   * Retrieves all products and maps them to ProductDto.
   * @returns An array of ProductDto.
   */
  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    const products: ProductDto[] = await this.productService.findAll();
    return products.map(
      (product: ProductDto): ProductDto => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        categoryId: product.categoryId,
      }),
    );
  }
}
