import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/user-associations";
import {
  IUserAssociation
} from "@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto";
import { IUser } from "@real-time-chat/util-api/features/user/abstractions/user.dto";
import useAuth from "@real-time-chat/react-shared/hooks/useAuth";

interface IContactListProps {
  onContactClick: (id: string) => void;
}

export function ContactList({ onContactClick }: IContactListProps) {
  const { user } = useAuth();

  const { data } = useQuery(
    ["user-associations"],
    ({ signal }) => axios.get<Array<IUserAssociation>>(`${baseApiRoute}/${user._id}`, { signal }).then(res => res.data)
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
