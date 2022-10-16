import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState, } from "react";
import { AxiosResponse } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUser_async, IUser } from "@real-time-chat/util-api/features/user";
import {
  logout_async,
  registerUser_async,
  signInWithEmailAndPassword_async
} from "@real-time-chat/util-shared/auth/auth.service";

export interface AuthContextType {
  user: IUser;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: AxiosResponse<any>;
  login: (email: string, password: string) => void;
  signUp: (email: string, name: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children, }: { children: ReactNode; }): JSX.Element {
  const [user, setUser] = useState<IUser>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<AxiosResponse<any> | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    getLoggedInUser_async()
      .then((newUser) => setUser(newUser))
      .catch(() => {
        console.error('something went wrong');
      })
      .finally(() => setLoadingInitial(false));
  }, []);

  function login(email: string, password: string) {
    setLoading(true);

    signInWithEmailAndPassword_async(email, password)
      .then((newUser) => {
        setUser(newUser);
        navigate("/");
      })
      .catch((newError) => setError(newError))
      .finally(() => setLoading(false));
  }

  function signUp(email: string, username: string, password: string) {
    setLoading(true);

    registerUser_async(email, username, password)
      .then((newUser) => {
        setUser(newUser);
        navigate("/");
      })
      .catch((newError) => setError(newError))
      .finally(() => setLoading(false));
  }

  function logout() {
    logout_async().then(() => setUser(undefined));
  }

  // Make the provider update only when it should
  const memoizedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue as AuthContextType}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
