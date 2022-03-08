// 3rd party
import { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable
} from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID
} = process.env;
export const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const messaging = getMessaging(app);
// LOCAL FIRESTORE : TESTING
connectFirestoreEmulator(db, 'localhost', 8080);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, 'localhost', 5001);
// @ts-ignore
export const UserContext = createContext<FBUser>();

// databases
export const COIN_DB: string = 'coin';
export const PHONE_NUMBER_DB: string = 'phone';

// delete user cloud function
export const deleteUser = httpsCallable(functions, 'deleteUser');
// export const sendMessages = httpsCallable(
//   functions,
//   'messageProfitingCoinsToDevices'
// );
export const getUser = auth?.currentUser;