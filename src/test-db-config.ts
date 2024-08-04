import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Configuration object for TypeORM module used in testing environments.
 * This configuration uses an SQLite database that runs in memory.
 */
export const testDbConfig: TypeOrmModuleOptions = {
  /**
   * Specifies the type of the database used. Here, it is SQLite.
   */
  type: 'sqlite',

  /**
   * Specifies the database name. For SQLite in memory, this is ':memory:'.
   */
  database: ':memory:',

  /**
   * Specifies the paths to entity files. Entities are loaded from TypeScript or JavaScript files.
   */
  entities: [__dirname + '/models/database/*.table.ts'],

  /**
   * If set to true, TypeORM will synchronize the database schema on application launch.
   */
  synchronize: true,
};
