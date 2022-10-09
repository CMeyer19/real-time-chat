import React, { useRef } from "react";
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import { signInWithEmailAndPassword_async } from "@real-time-chat/util-shared/auth/auth.service";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const loginHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const email = emailInputRef.current;
    const password = passwordInputRef.current;

    if (!email || !password) return;

    await signInWithEmailAndPassword_async(email.value, password.value);

    navigate("/");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Card sx={{ minWidth: 275, width: 275 }}>
        <CardContent>
          <form className="flex flex-col gap-2">
            <TextField
              inputRef={emailInputRef}
              label='Email'
              inputProps={{
                id: 'email',
                type: 'text'
              }}
              sx={{ width: '100%' }}
            />

            <TextField
              inputRef={passwordInputRef}
              label='Password'
              inputProps={{
                id: 'password',
                type: 'password'
              }}
              sx={{ width: '100%' }}
            />
          </form>
        </CardContent>

        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button size="small" sx={{ width: '100%' }} onClick={loginHandler}>
            Login
          </Button>

          <Button size="small" sx={{ width: '100%' }}>
            <Link to="/register">Register</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default LoginPage;
