import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { DATABASE_CONFIG_KEY } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseConfig = config.get(DATABASE_CONFIG_KEY);
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
