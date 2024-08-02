import { PointTransaction } from '../models/domain/point-transaction.entity';
import { PointTransactionTable } from '../models/database/point-transaction.table';
import { LoyaltyAccountMapper } from './loyalty-account.mapper';
import { ProductMapper } from './product.mapper';

export class PointTransactionMapper {
  static toDomain(
    pointTransactionTable: PointTransactionTable,
  ): PointTransaction {
    const pointTransaction = new PointTransaction();
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

  static toPersistence(
    pointTransaction: PointTransaction,
  ): PointTransactionTable {
    const pointTransactionTable = new PointTransactionTable();
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
