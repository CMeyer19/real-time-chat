import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/conversations";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export function ConversationList() {
  const fetchConversations = async () => {
    const result = await axios.get(baseApiRoute);
    return result.data;
  }

  console.log("conversation hit");
  const { data } = useQuery(
    ["conversations"],
    fetchConversations
  );

  return (
    <List>
      {data?.map((item: { _id: string }) => (
        <ListItem key={item._id} component={Link} to={item._id} disablePadding>
          <ListItemButton>
            <ListItemText primary={item._id}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
