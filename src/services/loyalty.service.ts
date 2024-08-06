import { Injectable, Inject } from '@nestjs/common';
import { ILoyaltyAccountRepository } from '../repositories/loyalty-account.repository.interface';
import { CheckoutResponseDto } from '../models/messages/checkout-response.dto';
import { PointsDto } from '../models/messages/points.dto';

/**
 * Service to handle loyalty related operations.
 */
@Injectable()
export class LoyaltyService {
  constructor(
    @Inject('ILoyaltyAccountRepository')
    private loyaltyAccountRepository: ILoyaltyAccountRepository,
  ) {}

  /**
   * Processes a checkout operation, calculating and recording points earned.
   * @param customerId The ID of the customer checking out.
   * @returns A CheckoutResponseDto containing the results of the checkout process.
   */
  async checkout(customerId: number): Promise<CheckoutResponseDto> {
    const result =
      await this.loyaltyAccountRepository.checkoutTransaction(customerId);

    const isSuccess =
      result.invalidProducts.length === 0 &&
      result.productsMissingCategory.length === 0 &&
      result.pointEarningRulesMissing.length === 0;

    return new CheckoutResponseDto({
      total_points_earned: result.totalPointsEarned,
      invalid_products: result.invalidProducts,
      products_missing_category: result.productsMissingCategory,
      point_earning_rules_missing: result.pointEarningRulesMissing,
      success: isSuccess,
    });
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
