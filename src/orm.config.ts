import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  synchronize: process.env.NODE_ENV === 'development',
  url: process.env.DATABASE_URL as string,
  logging: true,
  migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    entitiesDir: 'src/app/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

module.exports = ORMConfig;
