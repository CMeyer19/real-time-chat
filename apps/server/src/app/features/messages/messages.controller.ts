import { Body, Controller, Get, Post } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { IAddMessageDto } from "../../dtos/message.dto";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getData() {
    return this.messagesService.findAll();
  }

  @Post()
  create(@Body() createMessageDto: IAddMessageDto) {
    // console.log(createMessageDto);
    return this.messagesService.create(createMessageDto);
  }
}
