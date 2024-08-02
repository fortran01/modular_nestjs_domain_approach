import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoryTable } from './category.table';
import { PointTransactionTable } from './point-transaction.table';

@Entity('products')
export class ProductTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  image_url: string;

  @ManyToOne(() => CategoryTable, (category) => category.products)
  category: CategoryTable;

  @OneToMany(() => PointTransactionTable, (transaction) => transaction.product)
  transactions: PointTransactionTable[];
}
