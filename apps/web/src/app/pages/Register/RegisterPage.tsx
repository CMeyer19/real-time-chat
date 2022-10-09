import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { registerUser_async } from "@real-time-chat/util-shared/auth/auth.service";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/users";
import { IAddUserDto } from "@real-time-chat/util-api/features/users/abstractions/user.dto";
import { useNavigate } from "react-router-dom";

enum FormInputActionKind {
  userInput
}

interface IFormInputAction {
  type: FormInputActionKind;
  payload: string;
}

interface IFormInputState {
  value: string;
  isValid: boolean;
  validationError: string | null;
}

class FormInputState implements IFormInputState {
  value = '';
  isValid = false;
  validationError = null;
}

const emailReducer = (state: IFormInputState, action: IFormInputAction): IFormInputState => {
  switch (action.type) {
    case FormInputActionKind.userInput: {
      const value = action.payload;
      const isValid = value.includes('@');

      return {
        value,
        isValid,
        validationError: isValid ? null : 'Your email requires the @ char'
      };
    }
    default:
      return new FormInputState();
  }
}

const passwordReducer = (state: IFormInputState, action: IFormInputAction) => {
  switch (action.type) {
    case FormInputActionKind.userInput: {
      const value = action.payload;
      const isValid = value.length >= 6;

      return {
        value,
        isValid,
        validationError: isValid ? null : 'The password must be a minimum of 6 characters long'
      };
    }
    default:
      return new FormInputState();
  }
}

const usernameReducer = (state: IFormInputState, action: IFormInputAction) => {
  switch (action.type) {
    case FormInputActionKind.userInput: {
      const value = action.payload;
      const isValid = value.length >= 6;

      return {
        value,
        isValid,
        validationError: isValid ? null : 'The username must be a minimum of 6 characters long'
      };
    }
    default:
      return new FormInputState();
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
  ] = useReducer(usernameReducer, new FormInputState());
  const [
    {
      value: email,
      isValid: isEmailValid,
      validationError: emailValidationError
    },
    dispatchEmailAction
  ] = useReducer(emailReducer, new FormInputState());
  const [
    {
      value: password,
      isValid: isPasswordValid,
      validationError: passwordValidationError
    },
    dispatchPasswordAction
  ] = useReducer(passwordReducer, new FormInputState());

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(isEmailValid && isUsernameValid && isPasswordValid);
  }, [isEmailValid, isUsernameValid, isPasswordValid]);

  const createUserHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!isEmailValid || !isUsernameValid || !isPasswordValid) return;

    const userId = await registerUser_async(email, password);
    const requestBody: IAddUserDto = { userId, username };
    await axios.post(baseApiRoute, requestBody);

    navigate("/");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Card sx={{ minWidth: 275, width: 275 }}>
        <CardContent>
          <form className="flex flex-col gap-2">
            <TextField
              value={email}
              onChange={e => dispatchEmailAction({ payload: e.target.value, type: FormInputActionKind.userInput })}
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
              onChange={e => dispatchUsernameAction({ payload: e.target.value, type: FormInputActionKind.userInput })}
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
              onChange={e => dispatchPasswordAction({ payload: e.target.value, type: FormInputActionKind.userInput })}
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
