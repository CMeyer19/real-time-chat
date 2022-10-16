import React from "react";
import { IMessage } from "@real-time-chat/util-api/features/messages/abstractions/message.model";
import useAuth from "@real-time-chat/react-shared/hooks/useAuth";

interface IMessageProps {
  message: IMessage;
}

export default function Message({ message }: IMessageProps) {
  const { user } = useAuth();

  const classValue: string = message.createdBy === user._id ? 'flex gap-2' : 'flex gap-2 self-end';

  return (
    <div className={classValue}>
      <p>{new Date(message.createdAt).toLocaleString()}</p>
      <p>{message.text}</p>
    </div>
  );
}
