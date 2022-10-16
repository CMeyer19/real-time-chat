import React, { useEffect, useReducer, useState } from 'react';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
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

const usernameReducer = (state: FormInputStateType, action: IFormInputAction): FormInputStateType => {
  switch (action.type) {
    case FormInputActionKind.input: {
      const value = action.payload;
      const isValid = value.length >= 6;

      return {
        value,
        isValid,
        validationError: isValid ? null : 'The username must be a minimum of 6 characters long'
      };
    }
    default:
      return new FormInputState('');
  }
}

const RegisterPage = () => {
  const [
    {
      value: username,
      isValid: isUsernameValid,
      validationError: usernameValidationError
    },
    dispatchUsernameAction
  ] = useReducer(usernameReducer, new FormInputState(''));
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
  const { signUp } = useAuth();

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isEmailValid && isUsernameValid && isPasswordValid);
  }, [isEmailValid, isUsernameValid, isPasswordValid]);

  const createUserHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!isEmailValid || !isUsernameValid || !isPasswordValid) return;

    signUp(email, username, password);
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
              value={username}
              onChange={e => dispatchUsernameAction({ payload: e.target.value, type: FormInputActionKind.input })}
              label='Username'
              inputProps={{
                id: 'username',
                type: 'text'
              }}
              sx={{ width: '100%' }}
            />
            {!isUsernameValid && <p>{usernameValidationError}</p>}

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
          <Button disabled={!isFormValid} onClick={createUserHandler} size="small" sx={{ width: '100%' }}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default RegisterPage;
