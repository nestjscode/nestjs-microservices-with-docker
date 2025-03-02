import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { RabbitMqService, RabbitMqServiceInterface } from '@app/rabbitmq';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const configService = app.get(ConfigService);
  const rabbitMqService: RabbitMqServiceInterface = app.get(RabbitMqService);

  const queue = configService.get<string>('RABBITMQ_USER_QUEUE');

  app.connectMicroservice(rabbitMqService.getRmqOptions(queue!));
  await app.startAllMicroservices();
}
bootstrap()
  .then(() => console.log('User microservice is running'))
  .catch((e) => console.log(e));
