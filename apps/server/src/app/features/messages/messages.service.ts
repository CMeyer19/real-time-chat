import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../../db/schemas/message.schema';
import { IAddMessageDto } from '@real-time-chat/util-api/features/messages/abstractions/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {
  }

  create(addMessageRequest: IAddMessageDto & { createdByUserId: string }): Promise<Message> {
    return this.messageModel.create({
      text: addMessageRequest.text,
      conversation: addMessageRequest.conversationId,
      createdBy: addMessageRequest.createdByUserId
    });
  }

  async getMessagesForConversation(conversationId: string): Promise<Message[]> {
    return this.messageModel.find({ conversation: conversationId }).exec();
  }
}
