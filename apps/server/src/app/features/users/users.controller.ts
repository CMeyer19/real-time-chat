import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { baseApiRoute } from "@real-time-chat/util-api/features/users";
import { IAddUserDto } from "@real-time-chat/util-api/features/user/abstractions/user.dto";
import { UserService } from "../user/user.service";

@Controller(baseApiRoute)
export class UsersController {
  constructor(private readonly usersService: UserService) {
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return this.usersService.getUser(id);
  }

  @Post()
  create(@Body() createUser: IAddUserDto) {
    return this.usersService.create(createUser);
  }
}
