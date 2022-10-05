import { Body, Controller, Post } from '@nestjs/common';

import { UserAssociationsService } from './user-associations.service';
import {
  IAddUserAssociationDto
} from '@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto';
import { baseApiRoute } from '@real-time-chat/util-api/features/user-associations';

@Controller(baseApiRoute)
export class UserAssociationsController {
  constructor(private readonly userAssociationsService: UserAssociationsService) {
  }

  @Post()
  create(@Body() createUserAssociationDto: IAddUserAssociationDto) {
    console.log(createUserAssociationDto);
    return this.userAssociationsService.create(createUserAssociationDto);
  }
}
