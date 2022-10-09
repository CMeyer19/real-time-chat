import * as React from 'react';
import { useRef } from 'react';
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { registerUser_async } from "@real-time-chat/util-shared/auth/auth.service";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/users";
import { IAddUserDto } from "@real-time-chat/util-api/features/users/abstractions/user.dto";

const RegisterPage = () => {
  const emailInputRef = useRef<HTMLInputElement>();
  const usernameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const createUserHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const email = emailInputRef.current;
    const username = usernameInputRef.current;
    const password = passwordInputRef.current;

    if (!email || !username || !password) return;

    const userId = await registerUser_async(email.value, password.value);
    const requestBody: IAddUserDto = { userId, username: username.value };
    await axios.post(baseApiRoute, requestBody);
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
              inputRef={usernameInputRef}
              label='Username'
              inputProps={{
                id: 'username',
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
          <Button onClick={createUserHandler} size="small" sx={{ width: '100%' }}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};


export default RegisterPage;
