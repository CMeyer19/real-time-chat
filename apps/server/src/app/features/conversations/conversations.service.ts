import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation, ConversationDocument } from '../../db/schemas/conversation.schema';
import { IAddConversationDto } from '@real-time-chat/util-api/features/conversations/abstractions/conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(@InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>) {
  }

  async create(createConversationDto: IAddConversationDto): Promise<Conversation> {
    const createdConversation = new this.conversationModel(createConversationDto);
    return createdConversation.save();
  }

  async findAll(): Promise<Conversation[]> {
    return this.conversationModel.find().populate('participants').exec();
  }
}
