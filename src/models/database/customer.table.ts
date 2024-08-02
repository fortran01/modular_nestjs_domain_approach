import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { LoyaltyAccountTable } from './loyalty-account.table';

@Entity('customers')
export class CustomerTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(
    () => LoyaltyAccountTable,
    (loyaltyAccount) => loyaltyAccount.customer,
  )
  @JoinColumn()
  loyaltyAccount: LoyaltyAccountTable;
}
