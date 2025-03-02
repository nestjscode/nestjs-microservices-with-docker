import { ClientProxy, USER_CLIENT, UserPatterns } from '@app/contracts';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject(USER_CLIENT)
    private client: ClientProxy<UserPatterns>,
  ) {}
  getUser() {
    return this.client.send('getUser', { id: 123 });
  }
}
