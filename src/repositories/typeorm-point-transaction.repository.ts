import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PointTransaction } from '../domain/point-transaction.entity';
import { IPointTransactionRepository } from './point-transaction.repository.interface';

/**
 * Injectable class to handle operations for PointTransaction entities using TypeORM.
 */
@Injectable()
export class TypeOrmPointTransactionRepository
  implements IPointTransactionRepository
{
  /**
   * Repository for handling PointTransaction entities.
   * @param pointTransactionRepository Injected repository for PointTransaction.
   */
  constructor(
    @InjectRepository(PointTransaction)
    private pointTransactionRepository: Repository<PointTransaction>,
  ) {}

  /**
   * Creates a new point transaction in the repository.
   * @param transaction The PointTransaction object to create.
   * @returns A promise that resolves to the newly created PointTransaction.
   */
  async create(transaction: PointTransaction): Promise<PointTransaction> {
    return this.pointTransactionRepository.save(transaction);
  }

  /**
   * Finds point transactions by loyalty account ID.
   * @param loyaltyAccountId The unique identifier of the loyalty account.
   * @returns A promise that resolves to an array of PointTransaction objects.
   */
  async findByLoyaltyAccountId(
    loyaltyAccountId: number,
  ): Promise<PointTransaction[]> {
    return this.pointTransactionRepository.find({
      where: { loyaltyAccount: { id: loyaltyAccountId } },
    });
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
    return this.pointTransactionRepository.find({
      where: {
        transactionDate: Between(startDate, endDate),
      },
    });
  }
}
