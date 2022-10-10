import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from "axios";

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

export const registerUser_async = async (email: string, password: string): Promise<string> => {
  const response = await auth.createUserWithEmailAndPassword(email, password);
  const user = response.user;

  if (!user) throw new Error("Something went wrong in user creation process.");

  const userId: string = user.uid;
  storeUserId(userId);

  return userId;
};

export const signInWithEmailAndPassword_async = async (email: string, password: string): Promise<string> => {
  const response = await auth.signInWithEmailAndPassword(email, password);
  const user = response.user;

  if (!user) throw new Error("Something went wrong in user sign-in process.");

  await storeAccessToken();

  const userId: string = user.uid;
  storeUserId(userId);

  return userId;
};

axios.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken: string | null = getAccessToken();
  if (!accessToken) return config;

  config.headers['Authorization'] = accessToken;

  return config;
});
