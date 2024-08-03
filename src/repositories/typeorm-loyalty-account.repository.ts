import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyAccount } from '../models/domain/loyalty-account.entity';
import { LoyaltyAccountTable } from '../models/database/loyalty-account.table';
import { LoyaltyAccountMapper } from '../mappers/loyalty-account.mapper';
import { ILoyaltyAccountRepository } from './loyalty-account.repository.interface';

/**
 * Injectable class to handle operations for LoyaltyAccount entities using TypeORM.
 */
@Injectable()
export class TypeOrmLoyaltyAccountRepository
  implements ILoyaltyAccountRepository
{
  /**
   * Repository for handling LoyaltyAccountTable entities.
   * @param loyaltyAccountRepository Injected repository for LoyaltyAccountTable.
   */
  constructor(
    @InjectRepository(LoyaltyAccountTable)
    private loyaltyAccountRepository: Repository<LoyaltyAccountTable>,
  ) {}

  /**
   * Finds a loyalty account by its ID.
   * @param id The unique identifier of the loyalty account.
   * @returns A promise that resolves to the LoyaltyAccount or undefined if not found.
   */
  async findById(id: number): Promise<LoyaltyAccount | undefined> {
    const loyaltyAccountTable = await this.loyaltyAccountRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    return loyaltyAccountTable
      ? LoyaltyAccountMapper.toDomain(loyaltyAccountTable)
      : undefined;
  }

  /**
   * Finds a loyalty account by customer ID.
   * @param customerId The unique identifier of the customer.
   * @returns A promise that resolves to the LoyaltyAccount or undefined if not found.
   */
  async findByCustomerId(
    customerId: number,
  ): Promise<LoyaltyAccount | undefined> {
    const loyaltyAccountTable = await this.loyaltyAccountRepository.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
    return loyaltyAccountTable
      ? LoyaltyAccountMapper.toDomain(loyaltyAccountTable)
      : undefined;
  }

  /**
   * Creates a new loyalty account in the repository.
   * @param loyaltyAccount The LoyaltyAccount object to create.
   * @returns A promise that resolves to the newly created LoyaltyAccount.
   */
  async create(loyaltyAccount: LoyaltyAccount): Promise<LoyaltyAccount> {
    const loyaltyAccountTable =
      LoyaltyAccountMapper.toPersistence(loyaltyAccount);
    const savedLoyaltyAccountTable =
      await this.loyaltyAccountRepository.save(loyaltyAccountTable);
    return LoyaltyAccountMapper.toDomain(savedLoyaltyAccountTable);
  }

  /**
   * Updates an existing loyalty account in the repository.
   * @param loyaltyAccount The LoyaltyAccount object to update.
   * @returns A promise that resolves to the updated LoyaltyAccount.
   */
  async update(loyaltyAccount: LoyaltyAccount): Promise<LoyaltyAccount> {
    const loyaltyAccountTable =
      LoyaltyAccountMapper.toPersistence(loyaltyAccount);
    await this.loyaltyAccountRepository.update(loyaltyAccountTable.id, {
      points: loyaltyAccountTable.points,
    });
    return LoyaltyAccountMapper.toDomain(loyaltyAccountTable);
  }

  /**
   * Adds points to a loyalty account.
   * @param id The unique identifier of the loyalty account.
   * @param points The number of points to add.
   * @returns A promise that resolves to the updated LoyaltyAccount.
   * @throws Error if the loyalty account is not found.
   */
  async addPoints(id: number, points: number): Promise<LoyaltyAccount> {
    const loyaltyAccountTable = await this.loyaltyAccountRepository.findOne({
      where: { id },
    });
    if (!loyaltyAccountTable) {
      throw new Error('Loyalty account not found');
    }
    loyaltyAccountTable.points += points;
    const updatedLoyaltyAccountTable =
      await this.loyaltyAccountRepository.save(loyaltyAccountTable);
    return LoyaltyAccountMapper.toDomain(updatedLoyaltyAccountTable);
  }
}
