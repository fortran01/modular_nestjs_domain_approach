import { Injectable, Inject } from '@nestjs/common';
import { ICustomerRepository } from '../repositories/customer.repository.interface';
import { ILoyaltyAccountRepository } from '../repositories/loyalty-account.repository.interface';
import { IProductRepository } from '../repositories/product.repository.interface';
import { ICategoryRepository } from '../repositories/category.repository.interface';
import { IPointEarningRuleRepository } from '../repositories/point-earning-rule.repository.interface';
import { IShoppingCartRepository } from '../repositories/shopping-cart.repository.interface';
import { Customer } from '../models/domain/customer.entity';
import { LoyaltyAccount } from '../models/domain/loyalty-account.entity';
import { Product } from '../models/domain/product.entity';
import { Category } from '../models/domain/category.entity';
import { PointEarningRule } from '../models/domain/point-earning-rule.entity';
import { ShoppingCart } from '../models/domain/shopping-cart.entity';

/**
 * Injectable service for seeding the database with initial data.
 */
@Injectable()
export class DatabaseSeeder {
  constructor(
    @Inject('ICustomerRepository')
    private customerRepository: ICustomerRepository,
    @Inject('ILoyaltyAccountRepository')
    private loyaltyAccountRepository: ILoyaltyAccountRepository,
    @Inject('IProductRepository')
    private productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private categoryRepository: ICategoryRepository,
    @Inject('IPointEarningRuleRepository')
    private pointEarningRuleRepository: IPointEarningRuleRepository,
    @Inject('IShoppingCartRepository')
    private shoppingCartRepository: IShoppingCartRepository,
  ) {}

  /**
   * Seeds all entities into the database.
   */
  async seed(): Promise<void> {
    await this.seedCategories();
    await this.seedProducts();
    await this.seedCustomers();
    await this.seedPointEarningRules();
    await this.seedShoppingCarts();
  }

  /**
   * Seeds categories into the database.
   */
  private async seedCategories(): Promise<void> {
    const categories: { name: string }[] = [
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Default' },
    ];

    for (const categoryData of categories) {
      const category = new Category();
      category.name = categoryData.name;
      await this.categoryRepository.create(category);
    }

    console.log('Categories seeded');
  }

  /**
   * Seeds products into the database.
   */
  private async seedProducts(): Promise<void> {
    const categories = await this.categoryRepository.findAll();
    const electronics = categories.find((c) => c.name === 'Electronics');
    const books = categories.find((c) => c.name === 'Books');

    const products: {
      name: string;
      price: number;
      category: Category;
      image_url: string;
    }[] = [
      {
        name: 'Laptop',
        price: 1200.0,
        category: electronics!,
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/e/e9/Apple-desk-laptop-macbook-pro_%2823699397893%29.jpg',
      },
      {
        name: 'Science Fiction Book',
        price: 15.99,
        category: books!,
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Eric_Frank_Russell_-_Die_Gro%C3%9Fe_Explosion_-_Cover.jpg/770px-Eric_Frank_Russell_-_Die_Gro%C3%9Fe_Explosion_-_Cover.jpg',
      },
    ];

    for (const productData of products) {
      const product = new Product();
      Object.assign(product, productData);
      await this.productRepository.create(product);
    }

    console.log('Products seeded');
  }

  /**
   * Seeds customers and their loyalty accounts into the database.
   */
  private async seedCustomers(): Promise<void> {
    const customers: { name: string; email: string }[] = [
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Jane Smith', email: 'jane.smith@example.com' },
    ];

    for (const customerData of customers) {
      const customer = new Customer();
      Object.assign(customer, customerData);
      const createdCustomer = await this.customerRepository.create(customer);

      const loyaltyAccount = new LoyaltyAccount();
      loyaltyAccount.customer = createdCustomer;
      loyaltyAccount.points = 100;
      await this.loyaltyAccountRepository.create(loyaltyAccount);
    }

    console.log('Customers and Loyalty Accounts seeded');
  }

  /**
   * Seeds point earning rules into the database.
   */
  private async seedPointEarningRules(): Promise<void> {
    const categories = await this.categoryRepository.findAll();
    const electronics = categories.find((c) => c.name === 'Electronics');
    const books = categories.find((c) => c.name === 'Books');
    const defaultCategory = categories.find((c) => c.name === 'Default');

    const rules: {
      category: Category;
      pointsPerDollar: number;
      startDate: Date;
      endDate: Date;
    }[] = [
      {
        category: defaultCategory!,
        pointsPerDollar: 1,
        startDate: new Date('1900-01-01'),
        endDate: new Date('2099-12-31'),
      },
      {
        category: electronics!,
        pointsPerDollar: 2,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
      {
        category: books!,
        pointsPerDollar: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    ];

    for (const ruleData of rules) {
      const rule = new PointEarningRule();
      Object.assign(rule, ruleData);
      await this.pointEarningRuleRepository.create(rule);
    }

    console.log('Point Earning Rules seeded');
  }

  /**
   * Seeds shopping carts into the database.
   */
  private async seedShoppingCarts(): Promise<void> {
    const customers = await this.customerRepository.findAll();
    for (const customer of customers) {
      const shoppingCart = new ShoppingCart();
      shoppingCart.customer = customer;
      await this.shoppingCartRepository.save(shoppingCart);
    }

    console.log('Shopping Carts seeded');
  }
}
