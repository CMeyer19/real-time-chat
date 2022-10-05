import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/user-associations";
import { getUserId } from "../services/auth.service";

interface IContactListProps {
  onContactClick: (id: string) => void;
}

export function ContactList({ onContactClick }: IContactListProps) {
  const { data } = useQuery(
    ["user-associations"],
    () => axios.get(`${baseApiRoute}/${getUserId()}`).then((res) => res.data)
  );

  return (
    <List>
      {data?.map((item: { _id: string }) => (
        <ListItem key={item._id} onClick={() => onContactClick(item._id)} disablePadding>
          <ListItemButton>
            <ListItemText primary={item._id}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
