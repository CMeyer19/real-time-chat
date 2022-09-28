import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/messages";

export function Conversation() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(baseApiRoute).then((res) => {
      console.log(res.data);
    })
  }, []);

  const addMessage = (id: string | undefined) => {
    if (!id) return;

    axios.post(baseApiRoute, {
      text: 'hello',
      conversationId: id
    }).then(x => {
      console.log(x);
    });
  }

  return (
    <div>
      <p>{id}</p>
      <button onClick={() => addMessage(id)}>Submit</button>
    </div>
  );
}
