// This domain service encapsulates complex business logic that involves multiple entities,
// specifically focusing on the calculations of points based on product purchases and applicable rules.
// This aligns well with Domain-Driven Design (DDD) principles.
// In DDD, domain services are part of the core domain logic and
// contain business rules or operations that don't naturally fit
// within a single entity or value object.

import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { PointEarningRule } from './point-earning-rule.entity';

/**
 * Service responsible for calculating loyalty points based on product purchases and applicable rules.
 */
@Injectable()
export class PointCalculationService {
  /**
   * Calculates the number of points a product earns based on a given rule and date.
   * @param product The product for which points are being calculated.
   * @param rule The point earning rule to apply.
   * @param date The date of the transaction to check rule applicability.
   * @param quantity The quantity of the product being purchased.
   * @returns The number of points earned. Returns 0 if the product is not eligible or the rule is not active.
   */
  calculatePoints(
    product: Product,
    rule: PointEarningRule,
    date: Date,
    quantity: number,
  ): number {
    if (!product.isEligibleForPoints() || !rule.isActive(date)) {
      return 0;
    }
    return rule.calculatePoints(product.price) * quantity;
  }

  /**
   * Finds the first active point earning rule from a list of rules on a given date.
   * @param rules An array of PointEarningRule to search through.
   * @param date The date to check each rule's activity.
   * @returns The first active PointEarningRule if found, otherwise undefined.
   */
  findActiveRule(
    rules: PointEarningRule[],
    date: Date,
  ): PointEarningRule | undefined {
    return rules.find((rule) => rule.isActive(date));
  }
}
