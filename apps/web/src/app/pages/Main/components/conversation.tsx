import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";
import MessageInput from "./message-input";
import MessageList from "./message-list";

export default function Conversation() {
  const { id } = useParams<{ id: string }>();

  const createMessage = async (message: string) => {
    const response = await axios.post(baseApiRoute, {
      text: message,
      conversationId: id
    });

    return response.data;
  }

  if (!id) return (
    <p>Please select a chat</p>
  );

  const submitMessage = async (message: string) => {
    if (!id) return;

    await createMessage(message);
  }

  return (
    <div className="h-full flex flex-col">
      <MessageList conversationId={id}/>

      <MessageInput onSubmitMessage={submitMessage}/>
    </div>
  );
}
