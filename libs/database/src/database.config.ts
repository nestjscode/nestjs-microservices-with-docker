import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG_KEY = 'database';

export default registerAs(DATABASE_CONFIG_KEY, (): TypeOrmModuleOptions => {
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port,
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || '',
  };
});
