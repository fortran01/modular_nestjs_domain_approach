import { LoyaltyAccount } from '../models/domain/loyalty-account.entity';

/**
 * Interface for operations on the LoyaltyAccount repository.
 */
export interface ILoyaltyAccountRepository {
  /**
   * Finds a LoyaltyAccount by its ID.
   * @param id The unique identifier of the LoyaltyAccount.
   * @returns A promise that resolves to the LoyaltyAccount or undefined if not found.
   */
  findById(id: number): Promise<LoyaltyAccount | undefined>;

  /**
   * Finds a LoyaltyAccount by the customer's ID.
   * @param customerId The unique identifier of the customer associated with the LoyaltyAccount.
   * @returns A promise that resolves to the LoyaltyAccount or undefined if not found.
   */
  findByCustomerId(customerId: number): Promise<LoyaltyAccount | undefined>;

  /**
   * Creates a new LoyaltyAccount in the repository.
   * @param loyaltyAccount The LoyaltyAccount object to create.
   * @returns A promise that resolves to the newly created LoyaltyAccount.
   */
  create(loyaltyAccount: LoyaltyAccount): Promise<LoyaltyAccount>;

  /**
   * Updates an existing LoyaltyAccount in the repository.
   * @param loyaltyAccount The LoyaltyAccount object to update.
   * @returns A promise that resolves to the updated LoyaltyAccount.
   */
  update(loyaltyAccount: LoyaltyAccount): Promise<LoyaltyAccount>;

  /**
   * Adds points to a LoyaltyAccount.
   * @param id The unique identifier of the LoyaltyAccount to which points will be added.
   * @param points The number of points to add.
   * @returns A promise that resolves to the updated LoyaltyAccount with added points.
   */
  addPoints(id: number, points: number): Promise<LoyaltyAccount>;
}
