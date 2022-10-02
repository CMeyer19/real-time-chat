import React, { useRef } from "react";
import { TextField } from "@mui/material";

interface IMessageInputProps {
  onSubmitMessage: (message: string) => void
}

export default function MessageInput({ onSubmitMessage }: IMessageInputProps) {
  const messageInputRef = useRef<HTMLInputElement>();

  const onKeyPress = (e: { key: string }) => {
    if (e.key !== 'Enter') return;

    console.log(messageInputRef);
    const currentMessage = messageInputRef.current;

    if (currentMessage) {
      const currentValue = currentMessage.value;
      currentMessage.value = '';
      onSubmitMessage(currentValue);
    }
  }

  return (
    <div className="mt-auto w-full">
      <TextField
        inputRef={messageInputRef}
        onKeyDown={onKeyPress}
        label="Message"
        variant="outlined"
        className="w-full"
      />
    </div>
  );
}
