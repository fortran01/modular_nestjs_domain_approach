import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let mockProductService;

  beforeEach(async () => {
    mockProductService = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      mockProductService.findAll.mockResolvedValue(mockProducts);

      const result = await controller.getAllProducts();
      expect(result).toEqual(mockProducts);
      expect(mockProductService.findAll).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const mockProduct = { id: 1, name: 'Product 1' };
      mockProductService.findById.mockResolvedValue(mockProduct);

      const result = await controller.getProductById(1);
      expect(result).toEqual(mockProduct);
      expect(mockProductService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if product is not found', async () => {
      mockProductService.findById.mockResolvedValue(undefined);

      await expect(controller.getProductById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      // Update the mockProductDto to include all required properties
      const mockProductDto = {
        name: 'New Product',
        price: 100,
        image_url: 'http://example.com/product.jpg',
        categoryId: 5,
      };
      const mockCreatedProduct = { id: 1, ...mockProductDto };
      mockProductService.create.mockResolvedValue(mockCreatedProduct);

      const result = await controller.createProduct(mockProductDto);
      expect(result).toEqual(mockCreatedProduct);
      expect(mockProductService.create).toHaveBeenCalledWith(mockProductDto);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const mockProductDto = { name: 'Updated Product', price: 150 };
      const mockUpdatedProduct = { id: 1, ...mockProductDto };
      mockProductService.update.mockResolvedValue(mockUpdatedProduct);

      const result = await controller.updateProduct(1, mockProductDto);
      expect(result).toEqual(mockUpdatedProduct);
      expect(mockProductService.update).toHaveBeenCalledWith(1, mockProductDto);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID', async () => {
      mockProductService.delete.mockResolvedValue();

      await controller.deleteProduct(1);
      expect(mockProductService.delete).toHaveBeenCalledWith(1);
    });
  });
});
