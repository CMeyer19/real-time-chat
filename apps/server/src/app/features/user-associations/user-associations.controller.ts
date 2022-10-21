import { Body, Controller, Get, NotFoundException, Param, Post, Req, UnauthorizedException } from '@nestjs/common';

import { UserAssociationsService } from './user-associations.service';
import { baseApiRoute, IAddUserAssociationRequest } from '@real-time-chat/util-api/features/user-associations';
import { Request } from "express";
import { UserService } from "../user/user.service";
import { transform } from "../../helpers/auth-helper";

@Controller(baseApiRoute)
export class UserAssociationsController {
  constructor(
    private readonly _userAssociationsService: UserAssociationsService,
    private readonly _usersService: UserService,
  ) {
  }

  @Get(':id')
  getUserContacts(@Param('id') id: string) {
    return this._userAssociationsService.getUserAssociations(id);
  }

  @Post()
  async create(@Req() req: Request, @Body() createUserAssociation: IAddUserAssociationRequest): Promise<string> {
    const { user_id } = transform(req);

    if (!user_id) throw new UnauthorizedException("The user ID could not be extracted from this requests header");

    const associationUserId = await this._usersService.resolveUserIdFromUsername(createUserAssociation.associationUsername);
    if (!associationUserId) throw new NotFoundException(`We could not find a user associated with the username: ${createUserAssociation.associationUsername}`);

    return this._userAssociationsService.create({
      associationUserId: associationUserId,
      initiatorUserId: user_id
    });
  }
}
