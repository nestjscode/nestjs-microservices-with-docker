import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_CLIENT') private client: ClientProxy) {}
  getUser() {
    return this.client.send('getUser', {});
  }
}
