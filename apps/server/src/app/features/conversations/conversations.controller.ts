import { Body, Controller, Get, Post } from '@nestjs/common';
import { baseApiRoute } from '@real-time-chat/util-api/features/conversations/route.constant';

import { ConversationsService } from './conversations.service';
import { IAddConversationDto } from "@real-time-chat/util-api/features/conversations/abstractions/conversation.dto";

@Controller(baseApiRoute)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {
  }

  @Get()
  getData() {
    return this.conversationsService.findAll();
  }

  @Post()
  createConversation(@Body() request: IAddConversationDto) {
    return this.conversationsService.create(request);
  }
}
