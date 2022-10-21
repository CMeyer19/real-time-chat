import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from "axios";
import { baseApiRoute as usersBaseApiRoute } from "@real-time-chat/util-api/features/users";
import { getLoggedInUser_async, IAddUserDto, IUser } from "@real-time-chat/util-api/features/user";

const firebaseConfig = {
  apiKey: process.env["NX_FIREBASE_API_KEY"],
  authDomain: process.env["NX_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["NX_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["NX_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["NX_FIREBASE_MESSAGING_SENDER_ID"],
  appId: process.env["NX_FIREBASE_APP_ID"],
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const storeUserId = (userId: string) => {
  localStorage.setItem('userId', userId);
}

const storeAccessToken = async () => {
  const idToken: string = await auth.currentUser?.getIdToken() ?? '';

  localStorage.setItem('idToken', idToken);
}

export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem('idToken');
}

export const logout_async = async (): Promise<void> => {
  await auth.signOut();

  localStorage.removeItem('idToken');
  localStorage.removeItem('userId');
}

export const registerUser_async = async (email: string, username: string, password: string): Promise<IUser> => {
  const response = await auth.createUserWithEmailAndPassword(email, password);
  const user = response.user;

  if (!user) throw new Error("Something went wrong in user creation process.");

  const userId = user.uid;

  await axios.post(
    usersBaseApiRoute,
    {
      userId,
      username,
      email
    } as IAddUserDto
  );

  storeUserId(userId);

  return {
    username,
    email,
    _id: userId
  };
};

export const signInWithEmailAndPassword_async = async (email: string, password: string): Promise<IUser> => {
  const response = await auth.signInWithEmailAndPassword(email, password);
  const user = response.user;

  if (!user) throw new Error("Something went wrong in user sign-in process.");

  await storeAccessToken();

  const userId: string = user.uid;

  storeUserId(userId);

  return getLoggedInUser_async();
};

axios.interceptors.request.use((config) => {
  if (!config.headers) return config;


  const accessToken: string | null = getAccessToken();
  if (!accessToken) return config;

  config.headers['Authorization'] = accessToken;

  return config;
});
