import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAssociationsController } from './user-associations.controller';
import { UserAssociationsService } from './user-associations.service';
import { UserAssociation, UserAssociationSchema } from "../../db/schemas/user-association.schema";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserAssociation.name, schema: UserAssociationSchema }]),
    UserModule
  ],
  controllers: [UserAssociationsController],
  providers: [UserAssociationsService],
})
export class UserAssociationsModule {
}
