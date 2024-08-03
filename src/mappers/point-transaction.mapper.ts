import { PointTransaction } from '../models/domain/point-transaction.entity';
import { PointTransactionTable } from '../models/database/point-transaction.table';
import { LoyaltyAccountMapper } from './loyalty-account.mapper';
import { ProductMapper } from './product.mapper';

/**
 * Mapper class for converting between PointTransaction domain model and database table representations.
 */
export class PointTransactionMapper {
  /**
   * Converts a PointTransactionTable database object to a PointTransaction domain model.
   * @param pointTransactionTable - The database object to convert.
   * @returns The converted PointTransaction domain model.
   */
  static toDomain(
    pointTransactionTable: PointTransactionTable,
  ): PointTransaction {
    const pointTransaction: PointTransaction = new PointTransaction();
    pointTransaction.id = pointTransactionTable.id;
    pointTransaction.pointsEarned = pointTransactionTable.pointsEarned;
    pointTransaction.transactionDate = pointTransactionTable.transactionDate;
    pointTransaction.loyaltyAccount = pointTransactionTable.loyaltyAccount
      ? LoyaltyAccountMapper.toDomain(pointTransactionTable.loyaltyAccount)
      : null;
    pointTransaction.product = pointTransactionTable.product
      ? ProductMapper.toDomain(pointTransactionTable.product)
      : null;
    return pointTransaction;
  }

  /**
   * Converts a PointTransaction domain model to a PointTransactionTable for persistence.
   * @param pointTransaction - The domain model to convert.
   * @returns The PointTransactionTable database object.
   */
  static toPersistence(
    pointTransaction: PointTransaction,
  ): PointTransactionTable {
    const pointTransactionTable: PointTransactionTable =
      new PointTransactionTable();
    pointTransactionTable.id = pointTransaction.id;
    pointTransactionTable.pointsEarned = pointTransaction.pointsEarned;
    pointTransactionTable.transactionDate = pointTransaction.transactionDate;
    pointTransactionTable.loyaltyAccount = pointTransaction.loyaltyAccount
      ? LoyaltyAccountMapper.toPersistence(pointTransaction.loyaltyAccount)
      : null;
    pointTransactionTable.product = pointTransaction.product
      ? ProductMapper.toPersistence(pointTransaction.product)
      : null;
    return pointTransactionTable;
  }
}
