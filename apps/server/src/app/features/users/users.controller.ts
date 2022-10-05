import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { baseApiRoute } from "@real-time-chat/util-api/features/users";
import { IAddUserDto } from "../../dtos/user.dto";

@Controller(baseApiRoute)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUser: IAddUserDto) {
    return this.usersService.create(createUser);
  }
}
