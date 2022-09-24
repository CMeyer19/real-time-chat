import { Controller, Get } from '@nestjs/common';

import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  getData() {
    return this.conversationsService.findAll();
  }
}
