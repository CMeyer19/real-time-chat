// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Layout } from "./layout";

axios.defaults.baseURL = 'api';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout/>
    </QueryClientProvider>
  );
}
