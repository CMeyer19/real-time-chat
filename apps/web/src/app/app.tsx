import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import LoginPage from "./pages/Login/LoginPage";
import { socket } from "./services/sockets.service";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import MainPage from "./pages/Main/MainPage";
import PrivateRoutes from "@real-time-chat/components/PrivateRoutes/PrivateRoutes";

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
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<MainPage/>}/>
          </Route>

          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
