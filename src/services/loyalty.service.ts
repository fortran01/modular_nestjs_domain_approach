import { Injectable, Inject } from '@nestjs/common';
import { ILoyaltyService, CheckoutResult } from './loyalty.service.interface';
import { ILoyaltyAccountRepository } from '../repositories/loyalty-account.repository.interface';
import { IProductRepository } from '../repositories/product.repository.interface';
import { ICategoryRepository } from '../repositories/category.repository.interface';
import { IPointEarningRuleRepository } from '../repositories/point-earning-rule.repository.interface';
import { IPointTransactionRepository } from '../repositories/point-transaction.repository.interface';
import { Product } from '../domain/product.entity';
import { PointTransaction } from '../domain/point-transaction.entity';

/**
 * Service class for handling loyalty related operations.
 */
@Injectable()
export class LoyaltyService implements ILoyaltyService {
  constructor(
    @Inject('ILoyaltyAccountRepository')
    private loyaltyAccountRepository: ILoyaltyAccountRepository,
    @Inject('IProductRepository')
    private productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private categoryRepository: ICategoryRepository,
    @Inject('IPointEarningRuleRepository')
    private pointEarningRuleRepository: IPointEarningRuleRepository,
    @Inject('IPointTransactionRepository')
    private pointTransactionRepository: IPointTransactionRepository,
  ) {}

  /**
   * Processes a checkout operation for a customer with specified product IDs.
   * @param customerId The unique identifier of the customer.
   * @param productIds An array of product IDs for checkout.
   * @returns A promise that resolves to a CheckoutResult object.
   */
  async checkout(
    customerId: number,
    productIds: number[],
  ): Promise<CheckoutResult> {
    const loyaltyAccount =
      await this.loyaltyAccountRepository.findByCustomerId(customerId);
    if (!loyaltyAccount) {
      throw new Error('Loyalty account not found');
    }

    const result: CheckoutResult = {
      total_points_earned: 0,
      invalid_products: [],
      products_missing_category: [],
      point_earning_rules_missing: [],
    };

    for (const productId of productIds) {
      const product = await this.productRepository.findById(productId);
      if (!product) {
        result.invalid_products.push(productId);
        continue;
      }

      if (!product.categoryId) {
        result.products_missing_category.push(productId);
        continue;
      }

      const pointsEarned = await this.calculatePoints(product, new Date());
      if (pointsEarned === 0) {
        result.point_earning_rules_missing.push(productId);
        continue;
      }

      result.total_points_earned += pointsEarned;

      const transaction = new PointTransaction();
      transaction.loyaltyAccount = loyaltyAccount;
      transaction.product = product;
      transaction.pointsEarned = pointsEarned;
      transaction.transactionDate = new Date();
      await this.pointTransactionRepository.create(transaction);
    }

    await this.loyaltyAccountRepository.addPoints(
      loyaltyAccount.id,
      result.total_points_earned,
    );

    return result;
  }

  /**
   * Calculates the loyalty points for a given product on a specific date.
   * @param product The product for which points are to be calculated.
   * @param date The date on which the calculation is performed.
   * @returns A promise that resolves to the number of points earned.
   */
  async calculatePoints(product: Product, date: Date): Promise<number> {
    const category = await this.categoryRepository.findById(product.categoryId);
    if (!category) {
      return 0;
    }

    const rule =
      await this.pointEarningRuleRepository.findActiveRuleForCategory(
        category.id,
        date,
      );
    if (!rule) {
      return 0;
    }

    return product.calculatePoints(rule.pointsPerDollar);
  }

  /**
   * Retrieves the total loyalty points accumulated by a customer.
   * @param customerId The unique identifier of the customer.
   * @returns A promise that resolves to the number of points.
   */
  async getCustomerPoints(customerId: number): Promise<number> {
    const loyaltyAccount =
      await this.loyaltyAccountRepository.findByCustomerId(customerId);
    if (!loyaltyAccount) {
      throw new Error('Loyalty account not found');
    }
    return loyaltyAccount.points;
  }
}
