import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto } from '../dtos/product.dto';
import { Product } from '../domain/product.entity';

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
    const products: Product[] = await this.productService.findAll();
    return products.map(
      (product: Product): ProductDto => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category_id: product.category.id,
      }),
    );
  }
}
