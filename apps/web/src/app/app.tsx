// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Layout } from "./layouts/layout";
import React, { useEffect, useState } from "react";
import Login from "./pages/login";

axios.defaults.baseURL = 'api';

export const queryClient = new QueryClient();

export default function App() {
  const [authenticated, setAuthenticated] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) setAuthenticated(loggedInUser);
  }, []);

  if (!authenticated) {
    return (<Login setUser={setAuthenticated}/>);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout/>
    </QueryClientProvider>
  );
}
