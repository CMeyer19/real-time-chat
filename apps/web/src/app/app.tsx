import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Layout } from "./layouts/layout";
import React, { useEffect, useState } from "react";
import Login from "./pages/login";
import { getUserId } from "./services/auth.service";
import { socket } from "./services/sockets.service";

axios.defaults.baseURL = 'api';

export const queryClient = new QueryClient();

export default function App() {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(getUserId() ?? undefined);

  useEffect(() => {
    const loggedInUserId = getUserId();

    if (loggedInUserId) setLoggedInUserId(loggedInUserId);

    socket.on('connect', () => {
      console.log('Connected');

      socket.emit('events', { test: 'test' });
      socket.emit('identity', 0, (response: any) =>
        console.log('Identity:', response),
      );
    });

    socket.on('events', (data) => {
      console.log('event', data);
    });

    socket.on('exception', (data) => {
      console.log('event', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  if (!loggedInUserId) return <Login setUser={setLoggedInUserId}/>

  return (
    <QueryClientProvider client={queryClient}>
      <Layout/>
    </QueryClientProvider>
  );
}
