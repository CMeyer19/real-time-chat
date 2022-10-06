import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { baseApiRoute } from '@real-time-chat/util-api/features/conversations/route.constant';

import { ConversationsService } from './conversations.service';
import { IAddConversationDto } from "@real-time-chat/util-api/features/conversations/abstractions/conversation.dto";
import { parseJwt } from "@real-time-chat/util-shared/helpers/jwt-utils";

@Controller(baseApiRoute)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {
  }

  @Get()
  getData(@Req() req: Request) {
    console.log(parseJwt(req.header('Authorization')));
    return this.conversationsService.findAll();
  }

  @Post()
  createConversation(@Body() request: IAddConversationDto) {
    return this.conversationsService.create(request);
  }
}
