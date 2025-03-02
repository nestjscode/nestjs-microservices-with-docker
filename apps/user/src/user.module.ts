import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDBModule, UserEntity } from '@app/database';
import { RabbitMqModule } from '@app/rabbitmq';

@Module({
  imports: [
    RabbitMqModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
