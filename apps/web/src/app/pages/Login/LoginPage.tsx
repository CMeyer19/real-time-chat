import React, { useEffect, useReducer, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import {
  FormInputActionKind,
  FormInputState,
  IFormInputAction,
  IFormInputState
} from "@real-time-chat/util-shared/form/abstractions";
import useAuth from "@real-time-chat/react-shared/hooks/useAuth";

type FormInputStateType = IFormInputState<string>;

const emailReducer = (state: FormInputStateType, action: IFormInputAction): FormInputStateType => {
  switch (action.type) {
    case FormInputActionKind.input: {
      const value = action.payload;
      const isValid = value.includes('@');

      return {
        value,
        isValid,
        validationError: isValid ? null : 'Your email requires the @ char'
      };
    }
    default:
      return new FormInputState('');
  }
}

const passwordReducer = (state: FormInputStateType, action: IFormInputAction): FormInputStateType => {
  switch (action.type) {
    case FormInputActionKind.input: {
      const value = action.payload;
      const isValid = value.length >= 6;

      return {
        value,
        isValid,
        validationError: isValid ? null : 'The password must be a minimum of 6 characters long'
      };
    }
    default:
      return new FormInputState('');
  }
}

const LoginPage = () => {
  const [
    {
      value: email,
      isValid: isEmailValid,
      validationError: emailValidationError
    },
    dispatchEmailAction
  ] = useReducer(emailReducer, new FormInputState(''));
  const [
    {
      value: password,
      isValid: isPasswordValid,
      validationError: passwordValidationError
    },
    dispatchPasswordAction
  ] = useReducer(passwordReducer, new FormInputState(''));

  const { login } = useAuth();

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const loginHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!email || !password) return;

    login(email, password);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Card sx={{ minWidth: 275, width: 275 }}>
        <CardContent>
          <form className="flex flex-col gap-2">
            <TextField
              value={email}
              onChange={e => dispatchEmailAction({ payload: e.target.value, type: FormInputActionKind.input })}
              label='Email'
              inputProps={{
                id: 'email',
                type: 'text'
              }}
              sx={{ width: '100%' }}
            />
            {!isEmailValid && <p>{emailValidationError}</p>}

            <TextField
              value={password}
              onChange={e => dispatchPasswordAction({ payload: e.target.value, type: FormInputActionKind.input })}
              label='Password'
              inputProps={{
                id: 'password',
                type: 'password'
              }}
              sx={{ width: '100%' }}
            />
            {!isPasswordValid && <p>{passwordValidationError}</p>}
          </form>
        </CardContent>

        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button disabled={!isFormValid} size="small" sx={{ width: '100%' }} onClick={loginHandler}>
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
