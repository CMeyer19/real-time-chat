import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { socket } from "./services/sockets.service";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "@real-time-chat/react-shared/hooks/useAuth";

axios.defaults.baseURL = 'api';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Router/>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
