import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/conversations";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { getUserId } from "@real-time-chat/util-shared/auth/auth.service";

export function ConversationList() {
  const fetchConversations = async () => {
    const result = await axios.get(baseApiRoute);
    console.log(result.data);
    return result.data;
  }

  const { data } = useQuery(
    ["conversations"],
    fetchConversations
  );

  const userId = getUserId();

  return (
    <List>
      {data?.map((item: { _id: string; isGroupChat: boolean; participants: Array<{ _id: string; username: string; }>; }) => (
        <ListItem key={item._id} component={Link} to={item._id} disablePadding>
          <ListItemButton>
            <ListItemText primary={item.participants.filter(x => x._id !== userId)[0].username}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
