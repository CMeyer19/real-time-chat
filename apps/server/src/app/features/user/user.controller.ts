import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { baseApiRoute } from "@real-time-chat/util-api/features/user";
import { Request } from "express";
import { transform } from "../../helpers/auth-helper";

@Controller(baseApiRoute)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getLoggedInUser(req: Request) {
    const { user_id } = transform(req);

    return this.userService.getUser(user_id);
  }
}
