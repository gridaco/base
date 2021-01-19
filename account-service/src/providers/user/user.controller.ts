import { Controller, forwardRef, Inject } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}
}
