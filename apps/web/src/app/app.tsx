import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Layout } from "./layouts/layout";
import React, { useEffect, useState } from "react";
import Login from "./pages/login";
import { getUserId } from "./services/auth.service";

axios.defaults.baseURL = 'api';

export const queryClient = new QueryClient();

export default function App() {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(getUserId() ?? undefined);

  useEffect(() => {
    const loggedInUserId = getUserId();

    if (loggedInUserId) setLoggedInUserId(loggedInUserId);
  }, []);

  if (!loggedInUserId) return <Login setUser={setLoggedInUserId}/>

  return (
    <QueryClientProvider client={queryClient}>
      <Layout/>
    </QueryClientProvider>
  );
}
