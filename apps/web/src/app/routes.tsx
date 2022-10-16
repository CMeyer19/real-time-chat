import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useAuth from "@real-time-chat/react-shared/hooks/useAuth";
import Conversation from "./pages/Main/components/conversation";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/Main/MainPage";

function PrivateRoute() {
  const auth = useAuth();
  return auth ? <Outlet/> : <Navigate to="/login"/>;
}

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route element={<PrivateRoute/>}>
        <Route path='/' element={<MainPage/>}>
          <Route path=":id" element={<Conversation/>}/>
        </Route>
      </Route>

      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  );
}
