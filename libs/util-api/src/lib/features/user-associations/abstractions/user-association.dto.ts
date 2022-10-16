import { IUser } from "../../user/abstractions/user.dto";

export interface IAddUserAssociationRequest {
  associationUsername: string;
}

export interface IAddUserAssociationDto {
  initiatorUserId: string;
  associationUserId: string;
}

export interface IUserAssociation {
  _id: string;
  association: string | IUser;
  initiator: string | IUser;
}
