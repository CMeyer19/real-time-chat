import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop()
  isGroupChat: boolean;

  @Prop([String])
  participants: Array<string>;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
