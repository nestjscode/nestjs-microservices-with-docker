/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { DATABASE_CONFIG_KEY } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseConfig: any = config.get(DATABASE_CONFIG_KEY);
        console.log(databaseConfig);
        return {
          type: 'postgres',
          ...databaseConfig,
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class PostgresDBModule {}
