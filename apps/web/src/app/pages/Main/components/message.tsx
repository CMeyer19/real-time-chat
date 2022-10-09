import React from "react";
import { IMessage } from "@real-time-chat/util-api/features/messages/abstractions/message.model";
import { getUserId } from "@real-time-chat/util-shared/auth/auth.service";

interface IMessageProps {
  message: IMessage;
}

export default function Message({ message }: IMessageProps) {
  const userId: string | null = getUserId();

  const classValue: string = userId === null || message.createdBy === userId ? 'flex gap-2' : 'flex gap-2 self-end';

  return (
    <div className={classValue}>
      <p>{new Date(message.createdAt).toLocaleString()}</p>
      <p>{message.text}</p>
    </div>
  );
}
