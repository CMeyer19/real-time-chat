import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";
import Message from "./message";
import { IMessage } from "@real-time-chat/util-api/features/messages/abstractions/message.model";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { socket } from "../../../services/sockets.service";
import { IMessageEvent } from "@real-time-chat/util-api/gateways/message-event.interface";

interface IMessageListProps {
  conversationId: string;
}

export default function MessageList({ conversationId }: IMessageListProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["messages", conversationId],
    () => axios.get(`${baseApiRoute}/${conversationId}`).then((res: AxiosResponse<Array<IMessage>>) => res.data)
  );

  useEffect(() => {
    socket.on('messages', async (data: IMessageEvent) => {
      if (data.conversation !== conversationId) return;

      console.log(data);
      await queryClient.invalidateQueries(['messages']);
    });

    return () => {
      socket.off('messages');
    };
  }, [conversationId, queryClient]);


  if (!data?.length) return (<p>No messages</p>);

  return (
    <div className="flex flex-col">
      {data.map(message => (<Message key={message._id} message={message}/>))}
    </div>
  );
}
