import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMqModule } from '@app/rabbitmq';
import { USER_CLIENT } from '@app/contracts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMqModule.registerRmqRorRootAsync({
      provide: USER_CLIENT,
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          queue: config.get<string>('RABBITMQ_USER_QUEUE')!,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
