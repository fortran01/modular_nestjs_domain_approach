import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PointTransaction } from '../models/domain/point-transaction.entity';
import { PointTransactionTable } from '../models/database/point-transaction.table';
import { IPointTransactionRepository } from './point-transaction.repository.interface';
import { PointTransactionMapper } from '../mappers/point-transaction.mapper';

/**
 * Injectable class to handle operations for PointTransaction entities using TypeORM.
 */
@Injectable()
export class TypeOrmPointTransactionRepository
  implements IPointTransactionRepository
{
  /**
   * Repository for handling PointTransactionTable entities.
   * @param pointTransactionRepository Injected repository for PointTransactionTable.
   */
  constructor(
    @InjectRepository(PointTransactionTable)
    private pointTransactionRepository: Repository<PointTransactionTable>,
  ) {}

  /**
   * Creates a new point transaction in the repository.
   * @param transaction The PointTransaction object to create.
   * @returns A promise that resolves to the newly created PointTransaction.
   */
  async create(transaction: PointTransaction): Promise<PointTransaction> {
    const transactionTable = PointTransactionMapper.toPersistence(transaction);
    const savedTransactionTable =
      await this.pointTransactionRepository.save(transactionTable);
    return PointTransactionMapper.toDomain(savedTransactionTable);
  }

  /**
   * Finds point transactions by loyalty account ID.
   * @param loyaltyAccountId The unique identifier of the loyalty account.
   * @returns A promise that resolves to an array of PointTransaction objects.
   */
  async findByLoyaltyAccountId(
    loyaltyAccountId: number,
  ): Promise<PointTransaction[]> {
    const transactionTables = await this.pointTransactionRepository.find({
      where: { loyaltyAccount: { id: loyaltyAccountId } },
    });
    return transactionTables.map(PointTransactionMapper.toDomain);
  }

  /**
   * Finds point transactions within a specified date range.
   * @param startDate The start date of the range.
   * @param endDate The end date of the range.
   * @returns A promise that resolves to an array of PointTransaction objects.
   */
  async findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<PointTransaction[]> {
    const transactionTables = await this.pointTransactionRepository.find({
      where: {
        transactionDate: Between(startDate, endDate),
      },
    });
    return transactionTables.map(PointTransactionMapper.toDomain);
  }
}
