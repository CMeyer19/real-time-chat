import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAssociation, UserAssociationDocument } from '../../db/schemas/user-association.schema';
import {
  IAddUserAssociationDto
} from "@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto";

@Injectable()
export class UserAssociationsService {
  constructor(@InjectModel(UserAssociation.name) private userAssociationModel: Model<UserAssociationDocument>) {
  }

  async create(addUserAssociationRequest: IAddUserAssociationDto): Promise<string> {
    const result: UserAssociationDocument = await this.userAssociationModel.create({
      initiator: addUserAssociationRequest.initiator,
      association: addUserAssociationRequest.association
    });

    return result._id;
  }

  async getUserAssociations(id: string): Promise<Array<UserAssociation>> {
    return this.userAssociationModel
      .find({
        $or: [{ association: id }, { initiator: id }]
      })
      .populate('association initiator');
  }
}
