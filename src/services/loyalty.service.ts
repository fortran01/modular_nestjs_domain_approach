import { Injectable, Inject } from '@nestjs/common';
import { ILoyaltyAccountRepository } from '../repositories/loyalty-account.repository.interface';
import { IProductRepository } from '../repositories/product.repository.interface';
import { ICategoryRepository } from '../repositories/category.repository.interface';
import { IPointEarningRuleRepository } from '../repositories/point-earning-rule.repository.interface';
import { IPointTransactionRepository } from '../repositories/point-transaction.repository.interface';
import { PointCalculationService } from '../models/domain/point-calculation.service';
import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';
import { PointsDto } from '../models/messages/points.dto';
import { PointTransaction } from '../models/domain/point-transaction.entity';

/**
 * Service to handle loyalty related operations.
 */
@Injectable()
export class LoyaltyService {
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
    private pointCalculationService: PointCalculationService,
  ) {}

  /**
   * Processes a checkout operation, calculating and recording points earned.
   * @param customerId The ID of the customer checking out.
   * @param productIds An array of product IDs being purchased.
   * @returns A CheckoutResponseDto containing the results of the checkout process.
   */
  async checkout(
    customerId: number,
    productIds: number[],
  ): Promise<CheckoutResponseDto> {
    const loyaltyAccountDomain =
      await this.loyaltyAccountRepository.findByCustomerId(customerId);
    if (!loyaltyAccountDomain) {
      throw new Error('Loyalty account not found');
    }

    interface CheckoutResult {
      total_points_earned: number;
      invalid_products: number[];
      products_missing_category: number[];
      point_earning_rules_missing: number[];
    }

    const result: CheckoutResult = {
      total_points_earned: 0,
      invalid_products: [],
      products_missing_category: [],
      point_earning_rules_missing: [],
    };

    const date: Date = new Date();

    for (const productId of productIds) {
      const productDomain = await this.productRepository.findById(productId);
      if (!productDomain) {
        result.invalid_products.push(productId);
        continue;
      }

      if (!productDomain.isEligibleForPoints()) {
        result.products_missing_category.push(productId);
        continue;
      }

      const categoryDomain = await this.categoryRepository.findById(
        productDomain.category.id,
      );
      const rulesDomain = await this.pointEarningRuleRepository.findByCategory(
        categoryDomain.id,
      );
      const activeRuleDomain = this.pointCalculationService.findActiveRule(
        rulesDomain,
        date,
      );

      if (!activeRuleDomain) {
        result.point_earning_rules_missing.push(productId);
        continue;
      }

      const pointsEarned = this.pointCalculationService.calculatePoints(
        productDomain,
        activeRuleDomain,
        date,
      );
      result.total_points_earned += pointsEarned;

      const transactionDomain: PointTransaction = new PointTransaction();
      transactionDomain.loyaltyAccount = loyaltyAccountDomain;
      transactionDomain.product = productDomain;
      transactionDomain.pointsEarned = pointsEarned;
      transactionDomain.transactionDate = date;
      await this.pointTransactionRepository.create(transactionDomain);
    }

    loyaltyAccountDomain.addPoints(result.total_points_earned);
    await this.loyaltyAccountRepository.update(loyaltyAccountDomain);

    return new CheckoutResponseDto(result);
  }

  /**
   * Retrieves the total points for a customer's loyalty account.
   * @param customerId The ID of the customer whose points are being retrieved.
   * @returns A PointsDto containing the total points in the customer's loyalty account.
   */
  async getCustomerPoints(customerId: number): Promise<PointsDto> {
    const loyaltyAccountDomain =
      await this.loyaltyAccountRepository.findByCustomerId(customerId);
    if (!loyaltyAccountDomain) {
      throw new Error('Loyalty account not found');
    }
    return new PointsDto({ points: loyaltyAccountDomain.getPoints() });
  }
}
