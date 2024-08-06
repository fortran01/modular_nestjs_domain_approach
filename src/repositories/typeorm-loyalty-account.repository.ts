import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { LoyaltyAccount } from '../models/domain/loyalty-account.entity';
import { LoyaltyAccountTable } from '../models/database/loyalty-account.table';
import { PointTransactionTable } from '../models/database/point-transaction.table';
import { LoyaltyAccountMapper } from '../mappers/loyalty-account.mapper';
import { ILoyaltyAccountRepository } from './loyalty-account.repository.interface';
import { PointCalculationService } from '../models/domain/point-calculation.service';
import { PointEarningRuleTable } from '../models/database/point-earning-rule.table';
import { ProductMapper } from '../mappers/product.mapper';
import { TypeOrmPointEarningRuleRepository } from './typeorm-point-earning-rule.repository';
import { ShoppingCartTable } from '../models/database/shopping-cart.table';

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
    private entityManager: EntityManager,
    private pointCalculationService: PointCalculationService,
    @InjectRepository(PointEarningRuleTable)
    private pointEarningRuleRepository: TypeOrmPointEarningRuleRepository,
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

  /**
   * Processes a checkout transaction, ensuring all operations are atomic.
   * @param customerId The customer's ID.
   * @returns A promise that resolves to an object containing details of the transaction.
   */
  async checkoutTransaction(customerId: number): Promise<{
    totalPointsEarned: number;
    invalidProducts: number[];
    productsMissingCategory: number[];
    pointEarningRulesMissing: number[];
  }> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const loyaltyAccount = await transactionalEntityManager.findOne(
          LoyaltyAccountTable,
          { where: { customer: { id: customerId } }, relations: ['customer'] },
        );
        if (!loyaltyAccount) throw new Error('Loyalty account not found');

        // Fetch the shopping cart for the customer
        const cart = await transactionalEntityManager.findOne(
          ShoppingCartTable,
          {
            where: { customer: { id: customerId } },
            relations: ['items', 'items.product', 'items.product.category'],
          },
        );
        if (!cart || !cart.items.length)
          throw new Error('Shopping cart is empty or not found');

        let totalPointsEarned = 0;
        const invalidProducts: number[] = [];
        const productsMissingCategory: number[] = [];
        const pointEarningRulesMissing: number[] = [];
        const date = new Date(); // Current date for rule validation

        for (const item of cart.items) {
          const productTable = item.product;
          if (!productTable) {
            invalidProducts.push(item.product.id);
            continue;
          }

          if (!productTable.category) {
            productsMissingCategory.push(item.product.id);
            continue;
          }

          const product = ProductMapper.toDomain(productTable);
          const rules = await this.pointEarningRuleRepository.findByCategory(
            productTable.category.id,
          );
          const activeRule = this.pointCalculationService.findActiveRule(
            rules,
            date,
          );

          if (!activeRule) {
            pointEarningRulesMissing.push(item.product.id);
            continue;
          }

          const pointsEarned = this.pointCalculationService.calculatePoints(
            product,
            activeRule,
            date,
            item.quantity,
          );
          if (pointsEarned === 0) {
            pointEarningRulesMissing.push(item.product.id);
            continue;
          }

          totalPointsEarned += pointsEarned;
          const transaction = new PointTransactionTable();
          transaction.loyaltyAccount = loyaltyAccount;
          transaction.product = productTable;
          transaction.pointsEarned = pointsEarned;
          transaction.transactionDate = date;

          await transactionalEntityManager.save(transaction);
        }

        loyaltyAccount.points += totalPointsEarned;
        await transactionalEntityManager.save(loyaltyAccount);

        return {
          totalPointsEarned,
          invalidProducts,
          productsMissingCategory,
          pointEarningRulesMissing,
        };
      },
    );
  }
}
