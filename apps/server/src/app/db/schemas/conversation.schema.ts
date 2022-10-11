import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchemaName } from "./user.schema";

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop()
  isGroupChat: boolean;

  @Prop([{ type: String, ref: UserSchemaName }])
  participants: Array<User>;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

export const ConversationSchemaName: string = Conversation.name;
