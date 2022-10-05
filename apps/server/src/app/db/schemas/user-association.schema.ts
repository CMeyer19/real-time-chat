import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchemaName } from "./user.schema";

export type UserAssociationDocument = UserAssociation & Document;

@Schema()
export class UserAssociation {
  @Prop({ type: String, ref: UserSchemaName })
  initiator: User;

  @Prop({ type: String, ref: UserSchemaName })
  association: User;
}

export const UserAssociationSchema = SchemaFactory.createForClass(UserAssociation);

export const UserAssociationSchemaName = UserAssociation.name;
