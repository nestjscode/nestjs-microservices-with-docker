import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    console.log('get users request');
    return {
      id: 1,
      email: 'amir@gmail.com',
    };
  }
}
