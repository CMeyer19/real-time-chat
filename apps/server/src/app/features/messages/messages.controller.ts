import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { IAddMessageDto } from "@real-time-chat/util-api/features/messages/abstractions/message.dto";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  getData(@Param('id') id: string) {
    return this.messagesService.getMessagesForConversation(id);
  }

  @Post()
  create(@Body() createMessageDto: IAddMessageDto) {
    return this.messagesService.create(createMessageDto);
  }
}
