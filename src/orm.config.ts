import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  synchronize: process.env.NODE_ENV === 'development',
  url: process.env.DATABASE_URL as string,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/*.migration{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  cli: {
    entitiesDir: 'src/app/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

module.exports = ORMConfig;
