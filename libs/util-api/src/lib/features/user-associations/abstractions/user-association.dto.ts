import { IUser } from "../../users/abstractions/user.dto";

export interface IAddUserAssociationDto {
  initiator: string;
  association: string;
}

export interface IUserAssociation {
  _id: string;
  association: string | IUser;
  initiator: string | IUser;
}
