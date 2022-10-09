import { Navigate, Outlet } from 'react-router-dom';
import { getUserId } from "@real-time-chat/util-shared/auth/auth.service";

export default () => {
  const userId = getUserId();

  return (
    userId ? <Outlet/> : <Navigate to="login"/>
  );
}
