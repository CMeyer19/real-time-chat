import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/conversations";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { IConversation } from "@real-time-chat/util-api/features/conversations/abstractions/conversation.dto";
import useAuth from "@real-time-chat/react-shared/hooks/useAuth";

export function ConversationList() {
  const { user } = useAuth();
  const userId = user._id;

  const { data } = useQuery(
    ["conversations"],
    ({ signal }) => axios.get(baseApiRoute, { signal }).then((res: AxiosResponse<Array<IConversation>>) => res.data)
  );

  return (
    <List>
      {data?.map(item => (
        <ListItem key={item._id} component={Link} to={item._id} disablePadding>
          <ListItemButton>
            <ListItemText primary={item.participants.filter(x => x._id !== userId)[0].username}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
