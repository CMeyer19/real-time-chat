import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Conversation, ConversationSchemaName } from './conversation.schema';
import { User, UserSchemaName } from "./user.schema";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserSchemaName })
  createdBy: User;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ConversationSchemaName })
  conversation: Conversation;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export const MessageSchemaName: string = Message.name;
