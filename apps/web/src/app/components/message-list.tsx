import React from "react";
import axios, { AxiosResponse } from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";
import Message from "./message";
import { IMessage } from "@real-time-chat/util-api/features/messages/abstractions/message.model";
import { useQuery } from "@tanstack/react-query";

interface IMessageListProps {
  conversationId: string;
}

export default function MessageList({ conversationId }: IMessageListProps) {
  const { data } = useQuery(
    ["messages", conversationId],
    () => axios.get(`${baseApiRoute}/${conversationId}`).then((res: AxiosResponse<Array<IMessage>>) => res.data)
  );

  if (!data?.length) return (<p>No messages</p>);

  return (
    <div>
      {data.map(message => (<Message key={message._id} message={message}/>))}
    </div>
  );
}
