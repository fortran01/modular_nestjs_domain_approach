import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CustomerTable } from './customer.table';
import { PointTransactionTable } from './point-transaction.table';

@Entity('loyalty_accounts')
export class LoyaltyAccountTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  points: number;

  @OneToOne(() => CustomerTable, (customer) => customer.loyaltyAccount)
  customer: CustomerTable;

  @OneToMany(
    () => PointTransactionTable,
    (transaction) => transaction.loyaltyAccount,
  )
  transactions: PointTransactionTable[];

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastUpdated: Date;
}
