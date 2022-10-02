import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";
import MessageInput from "../components/message-input";
import MessageList from "../components/message-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Conversation() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const createMessage = async (message: string) => {
    const response = await axios.post(baseApiRoute, {
      text: message,
      conversationId: id
    });

    return response.data;
  }

  const { mutate } = useMutation(createMessage, {
    onSuccess: () => queryClient.invalidateQueries(['messages']),
  });

  if (!id) return (
    <p>Please select a chat</p>
  );

  const submitMessage = async (message: string) => {
    if (!id) return;

    mutate(message);
  }

  return (
    <div className="h-full flex flex-col">
      <MessageList/>

      <MessageInput onSubmitMessage={submitMessage}/>
    </div>
  );
}
