import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { IAddMessageDto } from "@real-time-chat/util-api/features/messages/abstractions/message.dto";
import { Message } from "../../db/schemas/message.schema";
import { EventsGateway } from "../../gateways/events.gateway";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";
import { Request } from "express";
import { transform } from "../../helpers/auth-helper";

@Controller(baseApiRoute)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly events: EventsGateway
  ) {
  }

  @Get(':id')
  getData(@Param('id') id: string) {
    return this.messagesService.getMessagesForConversation(id);
  }

  @Post()
  async create(@Req() req: Request, @Body() createMessageDto: IAddMessageDto): Promise<Message> {
    const { user_id } = transform(req);
    const createdMessage = await this.messagesService.create({ ...createMessageDto, createdByUserId: user_id });
    this.events.sendMessageEvent(createdMessage);
    return createdMessage;
  }
}
