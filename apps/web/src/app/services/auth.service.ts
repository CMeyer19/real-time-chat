import firebase from 'firebase/compat/app';
import { getAuth as firebaseGetAuth } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/users";

const firebaseConfig = {
  apiKey: "AIzaSyA0voEqZPxWLwtPAupOZ2EQpo0zpQTDmJE",
  authDomain: "real-time-chat-31ec8.firebaseapp.com",
  projectId: "real-time-chat-31ec8",
  storageBucket: "real-time-chat-31ec8.appspot.com",
  messagingSenderId: "939780098557",
  appId: "1:939780098557:web:78b4ca8a1174aaf4d13194"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export const getAuth = () => firebaseGetAuth();

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

export const registerUser_async = async (email: string, password: string): Promise<string | undefined> => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;

    if (!user) return undefined;

    const userId: string = user.uid;
    storeUserId(userId);

    const addedUserId = await axios.post(baseApiRoute, { userId });
    console.log(addedUserId);

    return userId;
  } catch (err) {
    console.error(err);
  }

  return undefined;
};

export const signInWithEmailAndPassword_async = async (email: string, password: string): Promise<string | undefined> => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);

    if (!result.user) return;

    await storeAccessToken();

    const userId: string = result.user.uid;
    storeUserId(userId);

    return userId;
  } catch (err) {
    console.error(err);
  }

  return undefined;
};

axios.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken: string | null = getAccessToken()
  if (!accessToken) return config;

  config.headers['Authorization'] = accessToken;

  return config;
});
