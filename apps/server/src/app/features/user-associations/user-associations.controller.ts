import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { UserAssociationsService } from './user-associations.service';
import {
  IAddUserAssociationDto
} from '@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto';
import { baseApiRoute } from '@real-time-chat/util-api/features/user-associations';
import { UsersService } from "../users/users.service";
import { parseJwt } from "@real-time-chat/util-shared/helpers/jwt-utils";
import { Request } from "express";

@Controller(baseApiRoute)
export class UserAssociationsController {
  constructor(
    private readonly userAssociationsService: UserAssociationsService,
    private readonly usersService: UsersService,
  ) {
  }

  @Get(':id')
  getUserContacts(@Param('id') id: string) {
    return this.userAssociationsService.getUserAssociations(id);
  }

  @Post()
  async create(@Req() req: Request, @Body() createUserAssociationDto: IAddUserAssociationDto) {
    const idToken = parseJwt(req.header('Authorization'));
    const initiator = idToken.user_id;

    const associationUserId = await this.usersService.resolveUserIdFromUsername(createUserAssociationDto.association);

    return this.userAssociationsService.create({
      association: associationUserId,
      initiator
    });
  }
}
