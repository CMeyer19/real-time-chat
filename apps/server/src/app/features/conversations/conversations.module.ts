import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Conversation, ConversationSchema } from '../../db/schemas/conversation.schema';
import { GroupConversationSchema, GroupConversationSchemaName } from "../../db/schemas/group-conversation.schema";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Conversation.name,
      schema: ConversationSchema,
      discriminators: [
        { name: GroupConversationSchemaName, schema: GroupConversationSchema }
      ]
    }
  ])],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {
}
