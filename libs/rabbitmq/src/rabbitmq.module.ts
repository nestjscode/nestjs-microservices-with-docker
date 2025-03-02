import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbitmq.service';
import { RabbitMqModuleAsyncOptions } from './types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get<string>('RABBITMQ_DEFAULT_USER');
          const PASSWORD = configService.get<string>('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get<string>('RABBITMQ_HOST');

          console.log('USER', USER);
          console.log('PASSWORD', PASSWORD);
          console.log('HOST', HOST);

          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue,
              queueOptions: {
                durable: true,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: RabbitMqModule,
      providers,
      exports: providers,
    };
  }

  static registerRmqRorRootAsync(
    options: RabbitMqModuleAsyncOptions,
  ): DynamicModule {
    const { inject, provide, imports, useFactory } = options;

    const providers = [
      {
        provide: provide,
        useFactory: async (configService: ConfigService) => {
          const { queue } = await useFactory(configService);

          // Retrieve configuration values from the config service
          const USER = configService.get<string>('RABBITMQ_DEFAULT_USER');
          const PASSWORD = configService.get<string>('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get<string>('RABBITMQ_HOST');

          console.log('USER', USER);
          console.log('PASSWORD', PASSWORD);
          console.log('HOST', HOST);
          console.log('Queue', queue);

          // Create and return the RabbitMQ client
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue,
              queueOptions: {
                durable: true,
              },
            },
          });
        },
        inject: [...inject],
      },
    ];

    return {
      module: RabbitMqModule,
      imports,
      providers,
      exports: providers,
    };
  }
}
