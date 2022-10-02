import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../../db/schemas/message.schema';
import { IAddMessageDto } from '../../dtos/message.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
  }

  async create(addMessageRequest: IAddMessageDto): Promise<string> {
    const result: MessageDocument = await this.messageModel.create({
      text: addMessageRequest.text,
      conversation: addMessageRequest.conversationId
    });

    return result._id;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}