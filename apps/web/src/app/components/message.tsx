import React from "react";
import { IMessage } from "@real-time-chat/util-api/features/messages/abstractions/message.model";

interface IMessageProps {
  message: IMessage;
}

export default function Message({ message }: IMessageProps) {
  return (
    <div className="flex gap-2">
      <p>{new Date(message.createdAt).toLocaleString()}</p>
      <p>{message.text}</p>
    </div>
  );
}
