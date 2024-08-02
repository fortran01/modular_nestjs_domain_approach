import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LoyaltyAccountTable } from './loyalty-account.table';
import { ProductTable } from './product.table';

@Entity('point_transactions')
export class PointTransactionTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pointsEarned: number;

  @Column()
  transactionDate: Date;

  @ManyToOne(() => LoyaltyAccountTable, (account) => account.transactions)
  loyaltyAccount: LoyaltyAccountTable;

  @ManyToOne(() => ProductTable, (product) => product.transactions)
  product: ProductTable;
}
