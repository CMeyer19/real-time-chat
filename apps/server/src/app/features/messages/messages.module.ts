import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from '../../db/schemas/message.schema';
import { GatewaysModule } from "../../gateways/gateways.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    GatewaysModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {
}
