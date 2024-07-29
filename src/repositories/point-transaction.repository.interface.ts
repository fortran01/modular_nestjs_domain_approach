import { PointTransaction } from '../domain/point-transaction.entity';

/**
 * Interface for point transaction repository operations.
 */
export interface IPointTransactionRepository {
  /**
   * Creates a new point transaction in the repository.
   * @param transaction The PointTransaction object to create.
   * @returns A promise that resolves to the newly created PointTransaction.
   */
  create(transaction: PointTransaction): Promise<PointTransaction>;

  /**
   * Finds all point transactions associated with a specific loyalty account ID.
   * @param loyaltyAccountId The unique identifier of the loyalty account.
   * @returns A promise that resolves to an array of PointTransaction objects.
   */
  findByLoyaltyAccountId(loyaltyAccountId: number): Promise<PointTransaction[]>;

  /**
   * Finds all point transactions within a specified date range.
   * @param startDate The start date of the range.
   * @param endDate The end date of the range.
   * @returns A promise that resolves to an array of PointTransaction objects.
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<PointTransaction[]>;
}
