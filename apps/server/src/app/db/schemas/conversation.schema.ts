import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchemaName } from "./user.schema";
import { GroupConversationSchemaName } from "./group-conversation.schema";

export type ConversationDocument = Conversation & Document;

@Schema({ discriminatorKey: 'kind' })
export class Conversation {
  @Prop({
    type: String,
    required: true,
    enum: [GroupConversationSchemaName],
  })
  kind: string;

  @Prop([{ type: String, ref: UserSchemaName }])
  participants: Array<User>;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

export const ConversationSchemaName: string = Conversation.name;
