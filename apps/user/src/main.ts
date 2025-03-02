import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap()
  .then(() => console.log('User microservice is running on 3001'))
  .catch(() => console.log('Something went wrong in user microservice'));
