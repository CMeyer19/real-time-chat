import React from "react";
import axios, { AxiosResponse } from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";
import Message from "./message";
import { IMessage } from "@real-time-chat/util-api/features/messages/abstractions/message.model";
import { useQuery } from "@tanstack/react-query";

export default function MessageList() {
  const { data } = useQuery(
    ["messages"],
    () => axios.get(baseApiRoute).then((res: AxiosResponse<Array<IMessage>>) => res.data)
  );

  if (!data) return (<p>No messages</p>);

  return (
    <div>
      {data.map(message => (<Message key={message._id} message={message}/>))}
    </div>
  );
}
