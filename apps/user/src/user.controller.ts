import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { USER_PATTERNS } from '@app/contracts';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_PATTERNS.GET_USER)
  getUser() {
    return this.userService.getUser();
  }
}
