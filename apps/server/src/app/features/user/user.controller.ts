import { Controller, Get, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { baseApiRoute } from "@real-time-chat/util-api/features/user";
import { Request } from "express";
import { parseJwt } from "@real-time-chat/util-shared/helpers/jwt-utils";

@Controller(baseApiRoute)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getLoggedInUser(@Req() req: Request) {
    const idToken = parseJwt(req.header('Authorization'));
    const userId = idToken.user_id;

    return this.userService.getUser(userId);
  }
}
