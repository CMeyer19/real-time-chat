import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserSchemaName } from "./user.schema";

export type UserAssociationDocument = UserAssociation & Document;

@Schema()
export class UserAssociation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserSchemaName })
  initiator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserSchemaName })
  association: User;
}

export const UserAssociationSchema = UserAssociation.name;
