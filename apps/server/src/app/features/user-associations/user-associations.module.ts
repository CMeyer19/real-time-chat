import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAssociationsController } from './user-associations.controller';
import { UserAssociationsService } from './user-associations.service';
import { UserAssociation, UserAssociationSchema } from "../../db/schemas/user-association.schema";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserAssociation.name, schema: UserAssociationSchema }]),
    UsersModule
  ],
  controllers: [UserAssociationsController],
  providers: [UserAssociationsService],
})
export class UserAssociationsModule {
}
