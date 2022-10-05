import { Controller, Get } from '@nestjs/common';
import { baseApiRoute } from '@real-time-chat/util-api/features/conversations/route.constant';

import { ConversationsService } from './conversations.service';

@Controller(baseApiRoute)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {
  }

  @Get()
  getData() {
    return this.conversationsService.findAll();
  }
}
