import { RefType } from "../../../abstractions/types/ref.type";
import { IUser } from "../../user/abstractions/user.dto";

export interface IAddConversationDto {
  isGroupChat: boolean;
  participants: Array<string>;
}

export interface IConversation<TParticipants extends RefType<IUser> = IUser> {
  _id: string;
  isGroupChat: boolean;
  participants: Array<TParticipants>;
}
