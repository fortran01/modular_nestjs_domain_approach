import { LoyaltyAccount } from '../models/domain/loyalty-account.entity';
import { LoyaltyAccountTable } from '../models/database/loyalty-account.table';
import { PointTransactionMapper } from './point-transaction.mapper';
import { CustomerMapper } from './customer.mapper';

export class LoyaltyAccountMapper {
  static toDomain(loyaltyAccountTable: LoyaltyAccountTable): LoyaltyAccount {
    const loyaltyAccount = new LoyaltyAccount();
    loyaltyAccount.id = loyaltyAccountTable.id;
    loyaltyAccount.points = loyaltyAccountTable.points;
    loyaltyAccount.customer = loyaltyAccountTable.customer
      ? CustomerMapper.toDomain(loyaltyAccountTable.customer)
      : null;
    loyaltyAccount.transactions = loyaltyAccountTable.transactions
      ? loyaltyAccountTable.transactions.map((transaction) =>
          PointTransactionMapper.toDomain(transaction),
        )
      : [];
    loyaltyAccount.lastUpdated = loyaltyAccountTable.lastUpdated;
    return loyaltyAccount;
  }

  static toPersistence(loyaltyAccount: LoyaltyAccount): LoyaltyAccountTable {
    const loyaltyAccountTable = new LoyaltyAccountTable();
    loyaltyAccountTable.id = loyaltyAccount.id;
    loyaltyAccountTable.points = loyaltyAccount.points;
    loyaltyAccountTable.customer = loyaltyAccount.customer
      ? CustomerMapper.toPersistence(loyaltyAccount.customer)
      : null;
    loyaltyAccountTable.transactions = loyaltyAccount.transactions
      ? loyaltyAccount.transactions.map((transaction) =>
          PointTransactionMapper.toPersistence(transaction),
        )
      : [];
    loyaltyAccountTable.lastUpdated = loyaltyAccount.lastUpdated;
    return loyaltyAccountTable;
  }
}
