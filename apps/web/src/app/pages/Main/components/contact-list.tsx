import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/user-associations";
import { getUserId } from "@real-time-chat/util-shared/auth/auth.service";
import {
  IUserAssociation
} from "@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto";
import { IUser } from "@real-time-chat/util-api/features/users/abstractions/user.dto";

interface IContactListProps {
  onContactClick: (id: string) => void;
}

export function ContactList({ onContactClick }: IContactListProps) {
  const { data } = useQuery(
    ["user-associations"],
    () => axios.get<Array<IUserAssociation>>(`${baseApiRoute}/${getUserId()}`).then(res => res.data)
  );

  return (
    <List>
      {data?.map(({ _id, association }) => (
        <ListItem key={_id} onClick={() => onContactClick(_id)} disablePadding>
          <ListItemButton>
            <ListItemText primary={(association as IUser).username}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
