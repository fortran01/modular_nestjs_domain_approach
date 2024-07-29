import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyAccount } from '../domain/loyalty-account.entity';
import { ILoyaltyAccountRepository } from './loyalty-account.repository.interface';

/**
 * Injectable class to handle operations for LoyaltyAccount entities using TypeORM.
 */
@Injectable()
export class TypeOrmLoyaltyAccountRepository
  implements ILoyaltyAccountRepository
{
  /**
   * Repository for handling LoyaltyAccount entities.
   * @param loyaltyAccountRepository Injected repository for LoyaltyAccount.
   */
  constructor(
    @InjectRepository(LoyaltyAccount)
    private loyaltyAccountRepository: Repository<LoyaltyAccount>,
  ) {}

  /**
   * Finds a loyalty account by its ID.
   * @param id The unique identifier of the loyalty account.
   * @returns A promise that resolves to the LoyaltyAccount or undefined if not found.
   */
  async findById(id: number): Promise<LoyaltyAccount | undefined> {
    return this.loyaltyAccountRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }

  /**
   * Finds a loyalty account by customer ID.
   * @param customerId The unique identifier of the customer.
   * @returns A promise that resolves to the LoyaltyAccount or undefined if not found.
   */
  async findByCustomerId(
    customerId: number,
  ): Promise<LoyaltyAccount | undefined> {
    return this.loyaltyAccountRepository.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  /**
   * Creates a new loyalty account in the repository.
   * @param loyaltyAccount The LoyaltyAccount object to create.
   * @returns A promise that resolves to the newly created LoyaltyAccount.
   */
  async create(loyaltyAccount: LoyaltyAccount): Promise<LoyaltyAccount> {
    return this.loyaltyAccountRepository.save(loyaltyAccount);
  }

  /**
   * Updates an existing loyalty account in the repository.
   * @param loyaltyAccount The LoyaltyAccount object to update.
   * @returns A promise that resolves to the updated LoyaltyAccount.
   */
  async update(loyaltyAccount: LoyaltyAccount): Promise<LoyaltyAccount> {
    await this.loyaltyAccountRepository.update(
      loyaltyAccount.id,
      loyaltyAccount,
    );
    return loyaltyAccount;
  }

  /**
   * Adds points to a loyalty account.
   * @param id The unique identifier of the loyalty account.
   * @param points The number of points to add.
   * @returns A promise that resolves to the updated LoyaltyAccount.
   * @throws Error if the loyalty account is not found.
   */
  async addPoints(id: number, points: number): Promise<LoyaltyAccount> {
    const account = await this.findById(id);
    if (!account) {
      throw new Error('Loyalty account not found');
    }
    account.addPoints(points);
    return this.update(account);
  }
}
