import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRoutesProps {
  authenticated: boolean;
}

export default ({ authenticated }: IPrivateRoutesProps) => {

  // const idToken = getAccessToken();
  // if (!idToken) return <Navigate to="login"/>;
  //
  // const parsedToken: IdTokenInterface = parseJwt(idToken);
  // const user = { userId: parsedToken.user_id, username: 'cock', email: parsedToken.email };

  // const getUser = async (userId: string) => {
  //   setLoading(true);
  //   const newText = await callAffiliateApi();
  //   setData(newText)
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   const userId = getUserId();
  //   if (userId) getUser(userId);
  // }, []);

  return (
    authenticated ?
      <Outlet/>
      : <Navigate to="login"/>
  );
}
