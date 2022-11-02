import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupConversationDocument = GroupConversation & Document;

@Schema()
export class GroupConversation {
  kind: string;
}

export const GroupConversationSchema = SchemaFactory.createForClass(GroupConversation);

export const GroupConversationSchemaName: string = GroupConversation.name;
