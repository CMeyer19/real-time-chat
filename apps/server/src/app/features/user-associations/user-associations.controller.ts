import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserAssociationsService } from './user-associations.service';
import {
  IAddUserAssociationDto
} from '@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto';
import { baseApiRoute } from '@real-time-chat/util-api/features/user-associations';

@Controller(baseApiRoute)
export class UserAssociationsController {
  constructor(private readonly userAssociationsService: UserAssociationsService) {
  }

  @Get(':id')
  getUserContacts(@Param('id') id: string) {
    return this.userAssociationsService.getUserAssociations(id);
  }

  @Post()
  create(@Body() createUserAssociationDto: IAddUserAssociationDto) {
    console.log(createUserAssociationDto);
    return this.userAssociationsService.create(createUserAssociationDto);
  }
}
