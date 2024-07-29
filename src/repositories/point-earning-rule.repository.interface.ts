import { PointEarningRule } from '../domain/point-earning-rule.entity';

/**
 * Interface for point earning rule repository operations.
 */
export interface IPointEarningRuleRepository {
  /**
   * Finds a point earning rule by its ID.
   * @param id The unique identifier of the point earning rule.
   * @returns A promise that resolves to the PointEarningRule or undefined if not found.
   */
  findById(id: number): Promise<PointEarningRule | undefined>;

  /**
   * Finds an active point earning rule for a specific category on a given date.
   * @param categoryId The unique identifier of the category.
   * @param date The date to check for an active rule.
   * @returns A promise that resolves to the PointEarningRule or undefined if no active rule is found.
   */
  findActiveRuleForCategory(
    categoryId: number,
    date: Date,
  ): Promise<PointEarningRule | undefined>;

  /**
   * Creates a new point earning rule in the repository.
   * @param rule The point earning rule object to create.
   * @returns A promise that resolves to the newly created PointEarningRule.
   */
  create(rule: PointEarningRule): Promise<PointEarningRule>;

  /**
   * Updates an existing point earning rule in the repository.
   * @param rule The point earning rule object to update.
   * @returns A promise that resolves to the updated PointEarningRule.
   */
  update(rule: PointEarningRule): Promise<PointEarningRule>;

  /**
   * Deletes a point earning rule from the repository by its ID.
   * @param id The unique identifier of the point earning rule to delete.
   * @returns A promise that resolves to void.
   */
  delete(id: number): Promise<void>;
}
