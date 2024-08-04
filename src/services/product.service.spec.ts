import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from '../models/domain/product.entity';
import { UpdateProductDto } from '../models/messages/product.dto';
import { ProductResponseDto } from '../models/messages/product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let mockProductRepository;
  let mockCategoryRepository;

  beforeEach(async () => {
    mockProductRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    mockCategoryRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: 'IProductRepository', useValue: mockProductRepository },
        { provide: 'ICategoryRepository', useValue: mockCategoryRepository },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a product when found', async () => {
      const mockProduct = new Product();
      mockProduct.id = 1;
      mockProduct.name = 'Test Product';

      mockProductRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findById(1);

      expect(result).toEqual(
        new ProductResponseDto({
          id: 1,
          name: 'Test Product',
          categoryId: null,
          image_url: undefined,
          price: undefined,
        }),
      );
      expect(mockProductRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return undefined when no product is found', async () => {
      mockProductRepository.findById.mockResolvedValue(undefined);

      const result = await service.findById(999);

      expect(result).toBeUndefined();
      expect(mockProductRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        new ProductResponseDto({
          id: 1,
          name: 'Product 1',
          categoryId: null,
          image_url: undefined,
          price: undefined,
        }),
        new ProductResponseDto({
          id: 2,
          name: 'Product 2',
          categoryId: null,
          image_url: undefined,
          price: undefined,
        }),
      ];
      mockProductRepository.findAll.mockResolvedValue([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ]);

      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
      expect(mockProductRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const mockProductDto = {
        name: 'New Product',
        price: 100,
        image_url: 'http://example.com/product.jpg',
        categoryId: 5,
      };
      const mockProduct = new ProductResponseDto({
        id: 1,
        name: 'New Product',
        price: 100,
        image_url: 'http://example.com/product.jpg',
        categoryId: null,
      });
      mockProductRepository.create.mockResolvedValue(mockProduct);
      mockCategoryRepository.findById.mockResolvedValue({ id: 5 });

      const result = await service.create(mockProductDto);
      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.create).toHaveBeenCalledWith(
        expect.any(Product),
      );
      expect(mockCategoryRepository.findById).toHaveBeenCalledWith(5);
    });
  });

  describe('update', () => {
    it('should update an existing product and return the updated product data', async () => {
      const mockProductDto = new UpdateProductDto({
        name: 'Updated Product',
        price: 150,
        image_url: undefined,
      });

      const mockProduct = new Product();
      mockProduct.id = 1;
      mockProduct.name = 'Updated Product';
      mockProduct.price = 150;
      mockProduct.category = null;
      mockProduct.image_url = undefined;

      mockProductRepository.findById.mockResolvedValue(mockProduct);
      mockProductRepository.update.mockResolvedValue(mockProduct);

      const result = await service.update(1, mockProductDto);

      expect(result).toEqual(
        new ProductResponseDto({
          id: 1,
          name: 'Updated Product',
          price: 150,
          image_url: undefined,
          categoryId: null,
        }),
      );
      expect(mockProductRepository.update).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw an error when the product to update is not found', async () => {
      mockProductRepository.findById.mockResolvedValue(undefined);

      await expect(
        service.update(999, new UpdateProductDto({})),
      ).rejects.toThrow('Product not found');
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      mockProductRepository.delete.mockResolvedValue();

      await service.delete(1);
      expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
