import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions & SeederOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [
    'dist/billing/domain/**/*.entity.js',
    'dist/sales/domain/**/*.entity.js',
  ],
  synchronize: false,
  seedTableName: 'seeds',
  seedName: 'seeder',
  migrationsTableName: 'migrations',
  migrations: [
    'dist/sales/infrastructure/database/migrations/*.js',
    'dist/billing/infrastructure/database/migrations/*.js',
  ],
  seeds: [
    'dist/sales/infrastructure/database/seeders/*.js',
    // 'dist/billing/infrastructure/database/seeders/*.js',
  ],
  seedTracking: true,
});

