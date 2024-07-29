import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseSeeder } from '../database/seeder';

/**
 * Injectable class responsible for executing the seed command.
 */
@Injectable()
export class SeedCommand {
  /**
   * Creates an instance of SeedCommand.
   * @param databaseSeeder The DatabaseSeeder instance used for seeding the database.
   */
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  /**
   * Command method to seed the database.
   * This method executes the seed operation and logs the outcome.
   */
  @Command({ command: 'seed', describe: 'Seed the database' })
  async seed(): Promise<void> {
    try {
      await this.databaseSeeder.seed();
      console.log('Database seeded successfully');
    } catch (error: any) {
      console.error('Error seeding database:', error);
    }
  }
}
