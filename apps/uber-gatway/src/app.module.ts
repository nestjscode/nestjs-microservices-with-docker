import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMqModule } from '@app/rabbitmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMqModule.registerRmqRorRootAsync({
      provide: 'USER_CLIENT',
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          queue: config.get<string>('RABBITMQ_USER_QUEUE')!,
        };
      },
    }),
    //RabbitMqModule.registerRmq('USER_CLIENT', process.env.RABBITMQ_USER_QUEUE!),
    // ClientsModule.register([
    //   {
    //     name: 'USER_CLIENT',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [`amqp://rabbitmq:rabbitmq@rabbitmq:5672`],
    //       queue: 'cats_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
