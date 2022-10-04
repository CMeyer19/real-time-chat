import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from '../../db/schemas/message.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  controllers: [UserController],
  providers: [MessagesService],
})
export class MessagesModule {
}
