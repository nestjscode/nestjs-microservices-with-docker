import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { RabbitMqServiceInterface } from './rabbitmq.interface';

@Injectable()
export class RabbitMqService implements RabbitMqServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  getRmqOptions(queue: string): RmqOptions {
    const USER = this.configService.get<string>('RABBITMQ_DEFAULT_USER');
    const PASSWORD = this.configService.get<string>('RABBITMQ_DEFAULT_PASS');
    const HOST = this.configService.get<string>('RABBITMQ_HOST');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        noAck: false,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  acknowledgeMessage(context: RmqContext) {
    const channel: any = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
