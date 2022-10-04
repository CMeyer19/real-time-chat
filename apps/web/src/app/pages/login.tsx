import React, { useRef } from "react";
import { TextField } from "@mui/material";
import { registerUser_async, signInWithEmailAndPassword_async } from "../services/auth.service";

interface ILoginProps {
  setUser: (userId: string) => void;
}

export default function Login({ setUser }: ILoginProps) {


  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const login = async (email: string, password: string) => {
    const userId = await signInWithEmailAndPassword_async(email, password);
    if (userId) setUser(userId);
  }

  const createUser = async (email: string, password: string) => {
    const userId = await registerUser_async(email, password);
    if (userId) setUser(userId);
  }

  const loginHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const email = emailInputRef.current;
    const password = passwordInputRef.current;

    if (!email || !password) return;

    login(email.value, password.value);
  };

  const createUserHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const email = emailInputRef.current;
    const password = passwordInputRef.current;

    if (!email || !password) return;

    createUser(email.value, password.value);
  };

  return (
    <div>
      <form onSubmit={createUserHandler}>
        <TextField
          inputRef={emailInputRef}
          label='Email'
          inputProps={{
            id: 'email',
            type: 'text'
          }}
        />

        <TextField
          inputRef={passwordInputRef}
          label='Password'
          inputProps={{
            id: 'password',
            type: 'password'
          }}
        />

        <button>Create User</button>
      </form>

      <button onClick={loginHandler}>Login</button>
    </div>
  );
}
