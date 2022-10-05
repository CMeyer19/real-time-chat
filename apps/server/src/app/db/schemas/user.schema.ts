import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  userId: string
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaName: string = User.name;
